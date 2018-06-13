/*jslint node: true */
'use strict';

const electron = require('electron');
const { app, BrowserWindow, globalShortcut, ipcMain } = electron;
const Store = require('electron-store');

const store = new Store();

var win;

ipcMain.on('resize', (event, left, top, w, h) => {
  win.setPosition(left, top);
  win.setSize(w, h);
});

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

  return win;
}

app.on('ready', function() {
  win = createWindow();
  if (store.get("hideIcon") == "hideIcon") {
    //Yeah I know, I could have used a boolean, right? But now, I use strings. Why? Just compatibility with the settings panel. If you can figure out a way to makes this pretty, lemme know.
    app.dock.hide();
  }

  globalShortcut.register('Alt+o', () => {
    win.isVisible() ? win.hide() : win.show();
  });

  globalShortcut.register('Alt+Ctrl+i', () => {
    win.webContents.openDevTools();
  });

  globalShortcut.register('Alt+i', () => {
    win.focus();
  });
});

// TODO:  better chunkwm integration
