'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron

var win = null;


//let win //makes the windows permanent with respect to the console process


function createWindow() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    width:      width,
    height:     height,
    frame:      false,
    transparent:true,
    resizable:  true,
    type:       'desktop',
  });

  win.loadURL('file://' + __dirname + '/app/index.html');
  win.setVisibleOnAllWorkspaces(true);
  win.setPosition(0,0)
}

app.on('ready', createWindow)
