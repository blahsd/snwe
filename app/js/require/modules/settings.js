/* jshint node: true */
'use strict';

/* global
  $, require, exports, __dirname, utils */

const {remote} = require('electron');
const {app, BrowserWindow} = remote;
const path = require('path');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;

class settingsModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  get icon() {
    return "fas fa-cog";
  }

  destroyWindow() {
    try {
      this.childWindow.close();
    } catch(e) {
      console.log("Settings Window has closed unexpectedly");
    }
    this.childWindow = null;
  }

  createWindow() {
    this.childWindow = new BrowserWindow({
      frame: false,
      transparent: true,
    });

    this.childWindow.loadURL('file://' + path.join(__dirname, '/../../../settings.html'));
    //childWindow.webContents.openDevTools();

    this.childWindow.webContents.on("changeSettingEvent", function(e) {
      utils.loadSettings();
    });

    try {
      this.childWindow.webContents.on("close", this.destroyWindow.bind(this));
    } catch (e) {
      console.log(e);
    }
  }

  toggleWindow() {
    if (this.childWindow) {
      this.destroyWindow();
    } else {
      this.createWindow();
    }
  }

  get HTMLContent() {
    return  `
    <div class="widg" id="${this.fileName}">
      <div class="button" id="${this.fileName}-button" >
        <i class="${this.icon}" id="${this.fileName}-icon"></i>
        <span id="${this.fileName}-output"></span>
      </div>
    </div>`;
  }

  start() {
    $(`#${this.fileName}-button`).on("click", this.toggleWindow.bind(this));
  }
}

exports.module = settingsModule;
