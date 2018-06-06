'use strict';

let {ipcRenderer} = electron;



window.onload=function() {
  window.$ = window.jQuery = require('jquery');
  loadSettings(["theme", "colorscheme","player"]);
  loadModules();

}
