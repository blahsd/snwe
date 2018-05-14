'use strict';
// Update Builtin Functions

const externalModule = require('./js/require/externalModule.js').externalModule;

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

function switchToDesktop (caller) {
  console.log(caller.value);
  // yeah but how do I switch desktop?
}

// General Functions
function injecthtmlmodule (moduleName, containerId) {

  var moduleHTML = `<div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-button">
        <i id="${moduleName}-icon"></i>
      </div>
      <span class="output" id="${moduleName}-output"> ... </span>
      <div class="popup" id="${moduleName}-popup">
      </div>
    </div>
    `
}

function loadModules() {
  const fs = require('fs');

  //const modulePath = "./app/modules/";
  //const moduleRelativePath = "../modules/";

  const moduleContainers = ["modules/left/","modules/middle/","modules/right/"];

  moduleContainers.forEach(containerPath => {

    var thisModulePath = path.join(__dirname, containerPath);
    var thisContainerName = containerPath.substring(containerPath.indexOf('/')+1, containerPath.length-1);

    fs.readdir(thisModulePath, (err, files) => {
      if (files == null) return;
      files.forEach(filename => {
        var filepath = thisModulePath + filename;
        let eM = new externalModule(filepath);

        eM.loadIn(document);
        eM.injectHTMLIn(document, thisContainerName);
      });
    })
  });
}

function update() {
  updateTime();
  updateDesktop();
}

window.onload=function() {
  loadSettings();
  loadModules();
  setInterval(update, 1000);
}
