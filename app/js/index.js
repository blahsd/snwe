/* jshint node:true */
'use strict';

const utils = require('./js/shared.js');
var window;

window.onload=function() {
  window.$ = window.jQuery = require('jquery');
  utils.loadSettings(["theme", "colorscheme","player"]);
  utils.loadModules();
};
