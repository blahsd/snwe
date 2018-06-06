'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron
const Store = require('electron-store');
  const store = new Store();

var win = null;

function createWindow() {


  let win = new BrowserWindow({

    frame:      false,
    transparent:true,
//	focusable:  false,
//  type:       'desktop',
    hasShadow: false,
  });

  win.loadURL('file://' + __dirname + '/app/index.html');
  //win.setAlwaysOnTop(true, 'torn-off-menu');
  win.setVisibleOnAllWorkspaces(true);
  //win.webContents.openDevTools();

  return win;
}

app.on('ready', function() {
  var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = createWindow();

  if (store.get("hideIcon") == "hideIcon") {
    //Yeah I know, I could have used a boolean, right? But now, I use strings. Why? Just compatibility with the settings panel. If you can figure out a way to makes this pretty, lemme know.

    app.dock.hide();
  }
  win.setPosition(-4,0);
  win.setSize(width+8,64,true);
})
