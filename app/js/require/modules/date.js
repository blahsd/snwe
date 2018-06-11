'use strict';

/* global
require, exports, __dirname */

const path = require('path');
const dateFormat = require('dateformat');
const ExternalModule = require( path.resolve('./app/js/require/ExternalModule.js')).ExternalModule;

class dateModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'middle';
    this.refreshRate = 60000;
  }

  update() {
    var now = new Date();
    var date = dateFormat(now, "ddd d mmm");
    this.updateContent($("#date-output"), date);
  }

  get HTMLContent() {
     var moduleName = this.fileName;
     return  `<div class="widg" id="${moduleName}">
         <span class="output" id="${moduleName}-output"> ... </span>
         </div>
       </div>`;
   }
}

exports.module = dateModule;
