'use strict';

var modulesList = [];

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


function update() {
  updateTime();
  updateDesktop();
}

var mM = new moduleManager();


window.onload=function() {
  loadSettings(["theme", "colorscheme","player"]);
  loadModules();

  setInterval(update, 1000);
}
