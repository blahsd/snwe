'use strict';

var options = ["theme","colorscheme","player"];
var filename = '';

function loadjscssfile(filename) {
  var filetype = filename.split('.').pop();

  if (filetype=="js"){ //if filename is a external JavaScript file
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
    /*var fs = require("fs");
    fs.stat(filename, function(err, stat) {
      if(err == null) {
          console.log('File exists' + fileref);
      } else if(err.code == 'ENOENT') {
          // file does not exist
          // WE'RE ASSUMING THAT THE ONLY FILE THAT CAN GO MISSING IS THE LINK TO .CACHE/WAL/COLORS.CSS – THIS IS VERY VERY FUCKING WRONG
          initializePywalLink(fileref);
      } else {
          console.log('Some other error: ', err.code);
      }
    });*/

    console.log(fileref.src)
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}

function initializePywalLink(fileref) {
  exec("ln -s $HOME/.cache/wal/colors.css ./app/css/colors-wal.css", function(err, stdout, stderr) {
  document.getElementsByTagName("head")[0].appendChild(fileref);
  });
}

function initializeSettings() {
  console.log("Initialising preferences...");
  store.set("theme", "/css/mono.css");
  store.set("colorscheme", "/css/colors.css");
  store.set("player", "/js/itunes.js");
}

function loadSettings() {
  console.log("Loading preferences...");
  for (var i = 0; i < options.length; i++) {
    var reqFile = store.get(options[i]);
    if (reqFile == undefined) {
      initializeSettings();
    }

    let eM = new externalModule(path.join(__dirname, reqFile));
    eM.loadIn(document);
  }
}
