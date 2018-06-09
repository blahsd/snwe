'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron
const Store = require('electron-store');
  const store = new Store();

const { globalShortcut } = require('electron');

const {ipcMain} = require('electron')
ipcMain.on('resize', (event, left, top, w, h) => {
  win.setPosition(left, top) //left, top
  win.setSize(w, h) //w, h
})

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

  globalShortcut.register('Alt+o', () => {
    // TODO: transition
    // TODO: show window only after loadResources() is complete
    win.isVisible() ? win.hide() : win.show()
  });

  globalShortcut.register('Alt+i', () => {
    win.focus()
  });
})
