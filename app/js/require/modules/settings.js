/* jshint node: true */
'use strict';

/* global
  $, require, exports, __dirname, utils */

const {remote} = require('electron');
const {BrowserWindow} = remote;
const path = require('path');
const ExternalModule = require( path.resolve('./app/js/require/ExternalModule.js')).ExternalModule;

class settingsModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  toggleWindow() {
    var windowpath = 'settings.html';

    if (this.childWindow) {
      this.childWindow.close();
      return;
    }

    let childWindow = new BrowserWindow({
      frame: false,
      transparent: true,
    });

    childWindow.loadURL('file://' + path.resolve('./app/settings.html'));
    //childWindow.webContents.openDevTools();

    childWindow.webContents.on("changeSettingEvent", function(e) {
      utils.loadSettings();
    });

    childWindow.webContents.on("close", function(e) {
      this.childWindow = null;
    });

    this.childWindow = childWindow;
  }

  get HTMLContent() {
    return  `
    <div class="widg" id="${this.fileName}">
      <div class="button" id="${this.fileName}-button" >
        <i class="fas fa-cog" id="settings-icon"></i>
        <span id="settings-output"></span>
      </div>
    </div>`;
  }

  start() {
    $(`#${this.fileName}-button`).on("click", this.toggleWindow.bind(this));
  }
}

exports.module = settingsModule;
