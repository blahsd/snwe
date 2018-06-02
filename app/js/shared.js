'use strict';

const VERSION = 'v0.1.0-rc.2'

// npm modules
const batteryLevel = require('battery-level');
const dateFormat = require('dateformat');
const electron = require('electron');
  const BrowserWindow = electron.remote.BrowserWindow;
const EventEmitter = require('events').EventEmitter;
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const console = require('electron').remote.getGlobal('console');
const isCharging = require('is-charging');
const loudness = require('loudness');
const osxBattery = require('osx-battery');
const path = require('path');
const Store = require('electron-store');
  const store = new Store();
const wifi = require('node-wifi');


const externalModule = require('./js/require/externalModule.js').externalModule;
const taskMonitor = require('./js/require/taskMonitor.js').taskMonitor;

const moduleManager = require('./js/require/moduleManager.js').moduleManager;

var mM = new moduleManager();


// extra functions

function openApp(appName) {
  var command = "open -a " + appName;
  execSync (command);
}


function removeFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function isInArray(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}

function fileExists(path) {
  var fs = require('fs');
  if (fs.existsSync(path)) {
    return(true);
  }
  return(false);
}

function toggleClass(element, tclass) {
  if (element.classList.contains(tclass) == true) {
    element.classList.remove(tclass);
  } else {
    element.classList.add(tclass);
  }
}

class snweModule {
  update() {
    //
  }
}

function initializePywalLink(fileref) {
  var filepath = path.join(__dirname, "css/colors-wal.css");

  try {
    execSync("ln -s $HOME/.cache/wal/colors.css "+filepath);
  } catch (e) {
    // file exists.
  }
}

function initializeSettings() {
  console.log("Initialising preferences...");
  initializePywalLink();

  store.set("version", VERSION);

  store.set("theme", path.join(__dirname, "css/mono.css"));
  store.set("colorscheme", path.join(__dirname, "css/colors.css"));
  store.set("player", path.join(__dirname, "js/require/itunes.js"));

  store.set("modules",
  [
    {
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
      "filename": "taskbar",
      "enabled": true
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
  ])
}


var openWindows = {};

function createSettingsWindow() {
  var windowpath = 'settings.html';
  const remote = require('electron').remote;
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
    loadSettings();
  })

  childWindow.webContents.on("close", function(e) {
    openWindows[windowpath] = null;
  })

  return childWindow;
}

function loadSettings(settings = ["theme","colorscheme","player"]) {
  console.log("Loading preferences...");

  // Check if settings have been updated since last version
  if (store.get("version") != VERSION) {
    console.log("*** WARNING: Updating settings to new version. This will delete your preferences. I feel bad, but it's the only way to make sure that you don't miss out on the new features.");
    initializeSettings();
  }

  for (var i = 0; i < settings.length; i++) {
    var node = document.getElementById(settings[i]);
    if (node) {
      node.parentNode.removeChild(node);
    }

    try {
      let settingEM = new externalModule(store.get(settings[i]), settings[i]);
      let settingName = settingEM.fileName;
      settingEM.loadIn(document);
    } catch (e) {
    // Settings have not been initialised
    initializeSettings();
    loadSettings();
    }
  }
}

function loadModules() {
  store.get("modules").forEach(module => {
    if (module["enabled"]) {
      mM.initializedModulesList.forEach( initializedModule => {
        if (module["filename"] == initializedModule.fileName) {
          initializedModule.loadIn();
          initializedModule.injectHTMLIn();
          initializedModule.start();
        }
      })
    }
  })
}
