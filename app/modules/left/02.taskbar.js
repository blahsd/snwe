'use strict';

const taskMonitor = require('./js/require/taskMonitor.js').taskMonitor;
const tm = new taskMonitor(1000);

document.getElementById("taskbar-button").style.display = "none";
document.getElementById("taskbar-output").innerHTML = ""
var appname;

function openApp(appName) {
  var command = "open -a " + appName;
  execSync (command);
}

tm.on('appEvent', (app, openStatus) => {
  if (openStatus == true) {
    document.getElementById("taskbar-output").insertAdjacentHTML("afterbegin", app.html);
  } else {
    var e = document.getElementById(`taskbar-${app.name}-button`);
    e.parentNode.removeChild(e);
  }
});

tm.start();
