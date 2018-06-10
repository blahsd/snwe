/* jshint node:true */
/* global
    $, require, __dirname */

'use strict';

var window;
var document;
var openWindows = {};

// global variables
const VERSION = 'v0.1.0-rc.2.0.4';

// pieces of electron
const electron = require('electron');
const { ipcRenderer, remote } = electron;
const { BrowserWindow } = remote;

// npm
const batteryLevel = require('battery-level');
const dateFormat = require('dateformat');
const isCharging = require('is-charging');
const loudness = require('loudness');
const osxBattery = require('osx-battery');
const wifi = require('node-wifi');
const Store = require('electron-store');
const { spawn, exec, execSync } = require('child_process');
const path = require('path');

// global objects
const store = new Store();
const console = remote.getGlobal('console');

// my own shit
const ExternalModule = require('./js/require/ExternalModule.js').ExternalModule;
const TaskMonitor = require('./js/require/TaskMonitor.js').TaskMonitor;
const ModuleManager = require('./js/require/ModuleManager.js').ModuleManager;
const moduleManager = new ModuleManager();

module.exports = {
  // extra functions
  openApp: function (appName) {
    var command = "open -a " + appName;
    execSync(command);
  },

  removeFromArray: function (array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  },

  isInArray: function (array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  },

  fileExists: function (path) {
    var fs = require('fs');
    if (fs.existsSync(path)) {
      return (true);
    }
    return (false);
  },

  toggleClass: function (element, tclass) {
    if (element.classList.contains(tclass) == true) {
      element.classList.remove(tclass);
    } else {
      element.classList.add(tclass);
    }
  },

  initializePywalLink: function (fileref) {
    var filepath = path.join(__dirname, "css/colors-wal.css");

    try {
      execSync("ln -s $HOME/.cache/wal/colors.css " + filepath);
    } catch (e) {
      // file exists.
    }
  },

  initializeSettings: function () {
    console.log("Initialising preferences...");
    module.exports.initializePywalLink();

    store.set("version", VERSION);

    store.set("hideIcon", "showIcon");

    store.set("theme", path.join(__dirname, "css/mono.css"));
    store.set("colorscheme", path.join(__dirname, "css/colors.css"));
    store.set("player", path.join(__dirname, "js/require/mpd.js"));

    store.set("modules", [{
        "filename": "desktop",
        "enabled": true
      },
      {
        "filename": "battery",
        "enabled": true
      },
      {
        "filename": "date",
        "enabled": true
      },
      {
        "filename": "player",
        "enabled": true
      },
      {
        "filename": "launcher",
        "enabled": true
      },
      {
        "filename": "taskbar",
        "enabled": false
      },
      {
        "filename": "volume",
        "enabled": true
      },
      {
        "filename": "wifi",
        "enabled": true
      },
      {
        "filename": "settings",
        "enabled": true
      },
      {
        "filename": "time",
        "enabled": true
      },
    ]);
  },

  createSettingsWindow: function () {
    var windowpath = 'settings.html';
    var windowparent = remote.getCurrentWindow();

    if (openWindows[windowpath] != null) {
      openWindows[windowpath].close();
      return;
    }

    let childWindow = new BrowserWindow({
      frame: false,
      transparent: true,
      parent: windowparent,
    });

    childWindow.loadURL('file://' + __dirname + '/' + windowpath);
    openWindows[windowpath] = childWindow;
    //childWindow.webContents.openDevTools();

    childWindow.webContents.on("changeSettingEvent", function(e) {
      module.exports.loadSettings();
    });

    childWindow.webContents.on("close", function(e) {
      openWindows[windowpath] = null;
    });

    return childWindow;
  },

  adaptToContent:function () {
    var topMargin = parseInt($("body").css('--top-margin'));
    var leftMargin = parseInt($("body").css('--left-margin'));
    var rightMargin = parseInt($("body").css('--right-margin'));
    var lineSize = parseInt($("body").css('--line-size'));

    //This gives the bar square corners. The window, which the system always draws with round corners, is actually a bit bigger than the bar – the bar doesn't fill it ocmpletely, so it can have WHATEVER FUCKING CORNERS IT WANTS

    var overflowCorrect = parseInt($("body").css('--overflow-correct'));
    var shadowCorrect = parseInt($("body").css('--shadow-correct'));

    var totalMargin = (leftMargin + rightMargin) - overflowCorrect * 2;

    // Since we'll be applying some of these to the window itself, we reset them in the .css

    var {
      width,
      height
    } = electron.screen.getPrimaryDisplay().workAreaSize;

    var barWidth = width - totalMargin;
    var barHeight = lineSize;


    ipcRenderer.send('resize', leftMargin - overflowCorrect, topMargin, barWidth, barHeight + shadowCorrect);
  },

  loadSettings:function (settings = ["theme", "colorscheme", "player"]) {
    console.log("Loading preferences...");

    // Check if settings have been updated since last version
    if (store.get("version") != VERSION) {
      console.log("*** WARNING: Updating settings to new version. This will delete your preferences. I feel bad, but it's the only way to make sure that you don't miss out on the new features.");
      module.exports.initializeSettings();
    }

    for (var i = 0; i < settings.length; i++) {
      var node = document.getElementById(settings[i]);
      if (node) {
        node.parentNode.removeChild(node);
      }

      try {
        let externalModule = new ExternalModule(store.get(settings[i]), settings[i]);
        let settingName = externalModule.fileName;
        externalModule.loadIn(document);
      } catch (e) {
        // Settings have not been initialised
        module.exports.initializeSettings();
        module.exports.loadSettings();
      }
    }
    setTimeout(module.export.adaptToContent, 1000);
  },

  loadModules:function() {
    store.get("modules").forEach(module => {
      if (module.enabled) {
        moduleManager.initializedModulesList.forEach(initializedModule => {
          if (module.filename == initializedModule.fileName) {
            initializedModule.loadIn();
            initializedModule.injectHTMLIn();
            initializedModule.start();
          }
        });
      }
    });
  }
};
