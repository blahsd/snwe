'use strict';

var modulesList = [];
const mainDocument = document;
// Update Builtin Functions

function updateTime() {
  var now = new Date();
  document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM");
}

function updateDesktop() {
  var dir = exec("echo $(/usr/local/bin/chunkc tiling::query -d id)", function(err, stdout, stderr) {
    document.getElementById("desktop-output").classList.remove("fab");
    document.getElementById("desktop-output").classList.remove("fa-apple");

    if (stderr) {
      document.getElementById("desktop-output").classList.add("fab");
      document.getElementById("desktop-output").classList.add("fa-apple");
      document.getElementById("desktop-output").innerHTML = "";
    } else {
      document.getElementById("desktop-output").innerHTML = stdout;
    }
  });
}

function loadModules() {
  const fs = require('fs');
  const moduleFolderRelativePath = '/modules';
  const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
  var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);
  var modulesRelativePath = modulesFilename.map(x => '/modules/'+x)
  var modulesAbsolutePath = modulesRelativePath.map(x => path.join(__dirname, x))

  modulesAbsolutePath.forEach(moduleAbsolutePath => {
    var module = require(moduleAbsolutePath).module;
    var m = new module(moduleAbsolutePath,document);
    m.loadIn();
    m.injectHTMLIn();
    m.start();

    modulesList.push(m);
  })
}

function update() {
  updateTime();
  updateDesktop();
}

window.onload=function() {
  loadSettings(["theme", "colorscheme","player"]);
  loadModules();
  setInterval(update, 1000);
}
