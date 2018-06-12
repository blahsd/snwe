/* jshint node:true */
'use strict';

/* global
  window, document, __dirname*/

const path = require('path');

var utils = require( path.resolve( __dirname, 'js/require/utils.js'));

window.onload=function() {

  window.$ = window.jQuery = require('jquery');
  utils.loadSettings(document, ["theme", "colorscheme","player"]);
  utils.moduleManager.initializeModules();
  utils.moduleManager.loadModules(utils.store.get("modules"));
};
