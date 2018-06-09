'use strict';

const VERSION = 'v0.1.0-rc.2.0.4'

// jquery
window.$ = window.jQuery = require('jquery');

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
const Store = require('electron-store')
const { spawn, exec, execSync } = require('child_process')

// my own shit
const ExternalModule = require('./js/require/ExternalModule.js').ExternalModule;
const TaskMonitor = require('./js/require/TaskMonitor.js').TaskMonitor;
const ModuleManager = require('./js/require/ModuleManager.js').ModuleManager;

// global objects
const moduleManager = new ModuleManager();
const store = new Store();

const console = remote.getGlobal('console');

// extra functions
function openApp(appName) {
  var command = "open -a " + appName;
  execSync(command);
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
    return (true);
  }
  return (false);
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
    execSync("ln -s $HOME/.cache/wal/colors.css " + filepath);
  } catch (e) {
    // file exists.
  }
}

function initializeSettings() {
  console.log("Initialising preferences...");
  initializePywalLink();

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
  ])
}

var openWindows = {};

function createSettingsWindow() {
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
    loadSettings();
  })

  childWindow.webContents.on("close", function(e) {
    openWindows[windowpath] = null;
  })

  return childWindow;
}

function adaptToContent() {
  var topMargin = parseInt($("body").css('--top-margin'))
  var leftMargin = parseInt($("body").css('--left-margin'))
  var rightMargin = parseInt($("body").css('--right-margin'))
  var lineSize = parseInt($("body").css('--line-size'))

  //This gives the bar square corners. The window, which the system always draws with round corners, is actually a bit bigger than the bar – the bar doesn't fill it ocmpletely, so it can have WHATEVER FUCKING CORNERS IT WANTS

  var overflowCorrect = parseInt($("body").css('--overflow-correct'))
  var shadowCorrect = parseInt($("body").css('--shadow-correct'))

  var totalMargin = (leftMargin + rightMargin) - overflowCorrect * 2

  // Since we'll be applying some of these to the window itself, we reset them in the .css

  var {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize

  var barWidth = width - totalMargin
  var barHeight = lineSize


  ipcRenderer.send('resize', leftMargin - overflowCorrect, topMargin, barWidth, barHeight + shadowCorrect);
}

function loadSettings(settings = ["theme", "colorscheme", "player"]) {
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
      let externalModule = new ExternalModule(store.get(settings[i]), settings[i]);
      let settingName = externalModule.fileName;
      externalModule.loadIn(document);
    } catch (e) {
      // Settings have not been initialised
      initializeSettings();
      loadSettings();
    }
  }

  setTimeout(adaptToContent, 1000)
}

function loadModules() {
  store.get("modules").forEach(module => {
    if (module["enabled"]) {
      moduleManager.initializedModulesList.forEach(initializedModule => {
        if (module["filename"] == initializedModule.fileName) {
          initializedModule.loadIn();
          initializedModule.injectHTMLIn();
          initializedModule.start();
        }
      })
    }
  })
}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements;

    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val;
}

function setSettingButtonValue(option) {
  const settings = ["theme","colorscheme","player","hideIcon"];

  // Create array of ExternalModule objects
  for (var i = 0; i < settings.length; i++) {
    let externalModule = new ExternalModule(store.get(settings[i]));
    document.getElementById(externalModule.fileNameAndExtension).checked = true;
  }
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setModuleButtons() {
  store.get("modules").forEach(module => {
    var filename = module["filename"];
    var moduleButtonHTML = `
    <label class="container"> ${capitalizeString(filename)}
      <input type="checkbox" checked="checked" id="${filename}"><span class="checkmark"></span>
    </label>`;

    this.document.getElementById("widget-panel").insertAdjacentHTML("beforeend", moduleButtonHTML);
  })
}

function setModuleButtonsValue() {
  store.get("modules").forEach(module => {
    document.getElementById(module["filename"]).checked = module["enabled"];
  })
}

function getPathOfButtonSetting(option) {
  // Check if the selected value is a simple value or points to an external file. In the latter case, instead of passing to the database the simple value, it passes the full path of the external file.

  var fileName = getRadioVal(document.getElementById(option+"-form"));

  if (fileName.includes('.')) {
    var filePath = path.join(__dirname, fileName);
  } else {
    var filePath = fileName;
  }

  return filePath;
}

function saveSettingsButtonValue(option) {
  console.log("Saving settings...");

  var value = getPathOfButtonSetting(option);

  store.set(option, value);
}

function saveModuleButtonValue(button) {
  buttonName = button.getAttribute("id");
  buttonValue = button.checked;

  moduleSettingValue = store.get("modules");

  moduleSettingValue.forEach(module => {
    if (module["filename"] == buttonName) {
      module["enabled"] = buttonValue;
    }
  })

  store.set("modules", moduleSettingValue);

  moduleManager.updateChangedModule(buttonName, buttonValue);
}

function setModuleButtonsListener() {
  store.get("modules").forEach(module => {
    var button = document.getElementById(module["filename"]);

    button.addEventListener("click", function(e) {
      saveModuleButtonValue(button);
    })
  })
}

function setSettingButtonListener() {
  const buttons = ["player", "theme", "colorscheme","hideIcon"];

  buttons.forEach( button => {
    document.getElementById(`${button}-form`).addEventListener("click", function(e) {
      saveSettingsButtonValue(`${button}`);
      remote.getCurrentWebContents().emit("changeSettingEvent");
      loadSettings();
    })
  })
}

function displayPanel(evt, panel) {
    // Declare all variables
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("panel");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("panellink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(panel).style.display = "block";
    try {
      evt.currentTarget.className += " active";
    } catch (e) {
      //
    }
}
