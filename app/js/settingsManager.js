
function fileExists(path) {
  var fs = require('fs');
  if (fs.existsSync(path)) {
    return(true);
  }
  return(false);
}

function initialisePywalLink(fileref) {
  exec("ln -s $HOME/.cache/wal/colors.css ./app/css/colors-wal.css", function(err, stdout, stderr) {
  if (err) {
    // should have err.code here?
  }
  console.log(stdout);

  document.getElementsByTagName("head")[0].appendChild(fileref);
});

}

function loadjscssfile(filename) {
  filename = "./css/" + filename;
  filetype = "css";

  console.log("Loading file "+filename)

  var fileref = document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)

  if (typeof fileref != "undefined") {
    var fs = require("fs");
    fs.stat(filename, function(err, stat) {
      if(err == null) {
          console.log('File exists' + fileref);
      } else if(err.code == 'ENOENT') {
          // file does not exist
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
  store.set("player","mpd")
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
  loadjscssfile(store.get('theme'));
  loadjscssfile(store.get('colorscheme'));
}
