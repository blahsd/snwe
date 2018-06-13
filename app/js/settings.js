/* jshint node: true */
'use strict';

/* global
  window, document */

var utils = require('./js/require/utils.js');

const {remote, globalShortcut} = require ('electron');
const path = require('path');
const ExternalModule = require( path.resolve(__dirname, 'js/require/ExternalModule.js')).ExternalModule;


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
    let externalModule = new ExternalModule(utils.store.get(settings[i]));
    document.getElementById(externalModule.fileNameAndExtension).checked = true;
  }
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setModuleButtons() {
  utils.store.get("modules").forEach(module => {
    var filename = module.filename;
    var moduleButtonHTML = `
    <label class="container"> ${capitalizeString(filename)}
      <input type="checkbox" checked="checked" id="${filename}"><span class="checkmark"></span>
    </label>`;
    document.getElementById("widget-panel").insertAdjacentHTML("beforeend", moduleButtonHTML);
  });
}

function setModuleButtonsValue() {
  utils.store.get("modules").forEach(module => {
    document.getElementById(module.filename).checked = module.enabled;
  });
}

function getPathOfButtonSetting(option) {
  // Check if the selected value is a simple value or points to an external file. In the latter case, instead of passing to the database the simple value, it passes the full path of the external file.

  var fileName = getRadioVal(document.getElementById(option+"-form"));
  var filePath;

  if (fileName.includes('.')) {
    filePath = path.join(__dirname, fileName);
  } else {
    filePath = fileName;
  }

  return filePath;
}

function saveSettingsButtonValue(option) {
  console.log("Saving settings...");

  var value = getPathOfButtonSetting(option);

  utils.store.set(option, value);
}

function saveModuleButtonValue(button) {
  let buttonName = button.getAttribute("id");
  let buttonValue = button.checked;

  let moduleSettingValue = utils.store.get("modules");

  moduleSettingValue.forEach(module => {
    if (module.filename == buttonName) {
      module.enabled = buttonValue;
    }
  });

  utils.store.set("modules", moduleSettingValue);

  utils.moduleManager.updateChangedModule(buttonName, buttonValue);
}

function setModuleButtonsListener() {
  utils.store.get("modules").forEach(module => {
    var button = document.getElementById(module.filename);

    button.addEventListener("click", function(e) {
      saveModuleButtonValue(button);
    });
  });
}

function setSettingButtonListener() {
  const buttons = ["player", "theme", "colorscheme","hideIcon"];

  buttons.forEach( button => {
    document.getElementById(`${button}-form`).addEventListener("click", function(e) {
      saveSettingsButtonValue(`${button}`);
      remote.getCurrentWebContents().emit("changeSettingEvent");
    });
  });
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

window.onload=function() {
  console.log("Loading settings window...")
  window.$ = window.jQuery = require('jquery');

  utils.loadSettings(document, ["theme","colorscheme"]);
  setModuleButtons();
  setModuleButtonsValue();
  setModuleButtonsListener();
  setSettingButtonValue();
  setSettingButtonListener();


};
