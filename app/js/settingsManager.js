
function fileExists(path) {
  var fs = require('fs');
  if (fs.existsSync(path)) {
    return(true);
  }
  return(false);
}

function initialisePywalLink(fileref) {
  exec("ln -s $HOME/.cache/wal/colors.css ./app/css/colors-wal.css", function(err, stdout, stderr) {
  document.getElementsByTagName("head")[0].appendChild(fileref);
  });
}

function loadjscssfile(filename, filetype) {
  console.log("Loading preference files from "+ filename);
  if (filetype=="js"){ //if filename is a external JavaScript file
    filename = "./js/" + filename;
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
    filename = "./css/" + filename;
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }

  if (typeof fileref != "undefined") {
    var fs = require("fs");
    fs.stat(filename, function(err, stat) {
      if(err == null) {
          console.log('File exists' + fileref);
      } else if(err.code == 'ENOENT') {
          // file does not exist
          // WE'RE ASSUMING THAT THE ONLY FILE THAT CAN GO MISSING IS THE LINK TO .CACHE/WAL/COLORS.CSS – THIS IS VERY VERY FUCKING WRONG
          initialisePywalLink(fileref);
      } else {
          console.log('Some other error: ', err.code);
      }
    });

    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}

function initializePreferences() {
  console.log("Initialising preferences...");
  store.set("theme", "mono.css");
  store.set("colorscheme", "colors.css");
  store.set("player", "itunes.js");
}

function loadSettings() {
  options = ["theme","colorscheme","player"];

  console.log("Checking for initialisation of preferences...");
  for (var i = 0; i < options.length; i++) {
    if (store.get(options[i]) == undefined) {
      initializePreferences();
    }
  }

  console.log("Loading preferences on file "+document.title)
  loadjscssfile(store.get('theme'),'css');
  loadjscssfile(store.get('colorscheme'),'css');
  loadjscssfile(store.get('player'),'js');
}
