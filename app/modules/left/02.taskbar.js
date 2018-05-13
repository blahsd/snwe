'use strict';

const taskMonitor = require('./js/require/taskMonitor.js').taskMonitor;
const tm = new taskMonitor(1000);

var apps = [];
var appBlacklist = ["osascript","Electron"];

function getRunningApps() {
  console.log(tm.running)
  apps = tm.runningApps;
}


function setRunningAppsDisplay() {
  document.getElementById("taskbar-output").innerHTML = "";
  apps.forEach(app => {
    document.getElementById("taskbar-output").insertAdjacentHTML("afterbegin", app.html);
  })
}

function updateTaskbar() {
  getRunningApps();
  setRunningAppsDisplay();
}

document.getElementById("taskbar-button").style.display = "none";


tm.on("taskChange", () => {
  console.log("he");
});
tm.start();
