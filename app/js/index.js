/* jshint node:true */
'use strict';

var utils = require('./js/require/utils.js');

window.onload=function() {
  window.$ = window.jQuery = require('jquery');
  utils.loadSettings(["theme", "colorscheme","player"]);
  utils.moduleManager.initializeModules();
  utils.moduleManager.loadModules(utils.store.get("modules"));
};
