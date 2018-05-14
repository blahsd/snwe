'use strict';

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

  const moduleContainers = ["modules/left/","modules/middle/","modules/right/"];

  moduleContainers.forEach(containerPath => {

    var thisModulePath = path.join(__dirname, containerPath);
    var thisContainerName = containerPath.substring(containerPath.indexOf('/')+1, containerPath.length-1);

    console.log(thisModulePath)
    console.log(thisContainerName)
    console.log(containerPath)

    fs.readdir(thisModulePath, (err, files) => {

      // This is making something ending in /README.md. HOW?=????
      // IT MEANS THISMODULEPATH IS WRONG AND ITS READING LIKE ./

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
  loadSettings(["theme", "colorscheme", "player"]);
  loadModules();
  setInterval(update, 1000);
}
