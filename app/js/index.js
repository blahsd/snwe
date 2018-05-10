// Update Builtin Functions

function updateTime() {
  var now = new Date();
  document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM");
}

function updateDesktop() {
  dir = exec("echo $(/usr/local/bin/chunkc tiling::query -d id)", function(err, stdout, stderr) {
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

function injecthtmlmodule (module, container) {
  moduleName = module.substring(module.indexOf('.')+1,module.length);
  console.log("... loaded. Injecting module: "+moduleName);
  moduleItem = `<div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-button">
        <i id="${moduleName}-icon"></i>
      </div>
      <span class="output" id="${moduleName}-output"> ... </span>
    </div>`

  document.getElementById(container).insertAdjacentHTML("afterbegin", moduleItem);
}

function loadModules() {
  const fs = require('fs');
  const modulePath = "./app/modules/";
  const moduleRelativePath = "../modules/";
  const moduleContainers = ["left","middle","right"];

  moduleContainers.forEach(container => {
    var thisModulePath = modulePath+container+'/';
    var thisModuleRelativePath = moduleRelativePath+container+'/';

    fs.readdir(thisModulePath, (err, files) => {
      files.forEach(filename => {
        loadjscssfile(thisModuleRelativePath+filename);
        injecthtmlmodule(filename.substring(0, filename.lastIndexOf('.')), container)
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
