'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron

var win = null;

function createWindow() {
  var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  let win = new BrowserWindow({
    width:      width+8,
    height:     50,
    frame:      false,
    transparent:true,
    resizable:  false,
    focusable:  false,
  //  type:       'desktop',
    hasShadow: false,
    skipTaskbar: true,
  });

  win.loadURL('file://' + __dirname + '/app/index.html');
  //win.setAlwaysOnTop(true, 'torn-off-menu');
  win.setVisibleOnAllWorkspaces(true);
  //win.webContents.openDevTools();
  win.setPosition(-4,0);
}

app.on('ready', createWindow)
app.dock.hide();
