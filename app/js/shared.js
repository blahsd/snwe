const batteryLevel = require('battery-level');
const dateFormat = require('dateformat');
const electron = require('electron');
  const BrowserWindow = electron.remote.BrowserWindow;
const exec = require('child_process').exec;
const console = require('electron').remote.getGlobal('console')
const isCharging = require('is-charging');
const loudness = require('loudness');
const osxBattery = require('osx-battery');
const Store = require('electron-store');
  const store = new Store();
const wifi = require('node-wifi');


//const remove = require('electron').remote;
