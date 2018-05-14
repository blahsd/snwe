'use strict';
var openWindows = {};

function createChildWindow(windowpath, parent) {

  if (openWindows[windowpath] != null) {
    openWindows[windowpath].close();
    return;
  }

  // TO DO: Figure out the position of parent and get the window to spawn right below it.


  let childWindow = new BrowserWindow({
     frame: false,
     transparent: true,
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
