'use strict';

window.onload=function() {
  window.$ = window.jQuery = require('jquery');
  loadSettings(["theme", "colorscheme","player"]);
  loadModules();
}
