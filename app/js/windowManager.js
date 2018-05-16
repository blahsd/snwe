'use strict';
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
