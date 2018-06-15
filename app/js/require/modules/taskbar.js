/* jshint node: true */
'use strict';

/* global
  utils, $, require, document, __dirname */

const path = require('path');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;
const TaskMonitor =  require(path.resolve(__dirname, '../TaskMonitor.js')).TaskMonitor;

class taskbarModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'left';

    this.tm = new TaskMonitor(1000);
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" id="${moduleName}">
        <span class="output" id="${moduleName}-output"></span>
        </div>
      </div>`;
  }
  start() {
    this.tm.start(1000);

    this.tm.on('appEvent', (app, openStatus) => {
      if (openStatus == true) {
        document.getElementById("taskbar-output").insertAdjacentHTML("afterbegin", app.html);

        $(`#taskbar-${app.name}-button`).on("click", function() {
          utils.openApp(app.name);
        });

      } else {
        var e = document.getElementById(`taskbar-${app.name}-button`);
        e.parentNode.removeChild(e);
      }
    });
  }
}

exports.module = taskbarModule;
