/* jshint node: true */
'use strict';

/* global
  $, require, exports, __dirname, setInterval */

const path = require('path');
const {exec} = require('child_process');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;

class chunkwmModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.command = 'chunkc tiling::desktop --layout';
  }

  get HTMLContent() {
    return  `
    <div class="widg" id="${this.fileName}">
      <div class="button" id="${this.fileName}-button">
        <i class="far fa-window-restore" id="${this.fileName}-icon"></i>
        <span id="${this.fileName}-output"></span>
      </div>

      <div class="popup" id="${this.fileName}-popup">
        <div class="button ${this.fileName}-button" value="bsp" id="bsp-${this.fileName}-button">
          bsp
        </div>|
        <div class="button ${this.fileName}-button" value="monocle" id="monocle-${this.fileName}-button">
          mono
        </div>|
        <div class="button ${this.fileName}-button" value="float" id="float-${this.fileName}-button">
          float
        </div>
      </div>
    </div>`;
  }

  start() {
    this.setPopupListeners();
  }
}

exports.module = chunkwmModule;
