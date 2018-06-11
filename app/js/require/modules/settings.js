'use strict';

/* global
require, exports, __dirname */

const path = require('path');
const ExternalModule = require( path.resolve('./app/js/require/ExternalModule.js')).ExternalModule;

class settingsModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  update() {
    //
  }

  start() {
    //
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `
    <div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-button" onclick="createSettingsWindow();">
        <i class="fas fa-cog" id="settings-icon"></i>
        <span id="settings-output"></span>
      </div>
    </div>`
  }
}

exports.module = settingsModule;
