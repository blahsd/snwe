'use strict';

// npm modules
const batteryLevel = require('battery-level');
const dateFormat = require('dateformat');
const electron = require('electron');
  const BrowserWindow = electron.remote.BrowserWindow;
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


// extra functions

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
