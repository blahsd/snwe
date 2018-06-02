'use strict';

var modulesList = [];

window.onload=function() {
  loadSettings(["theme", "colorscheme","player"]);
  loadModules();
}
