'use strict';

function initializePywalLink(fileref) {
  exec("ln -s $HOME/.cache/wal/colors.css ./app/css/colors-wal.css", function(err, stdout, stderr) {
  document.getElementsByTagName("head")[0].appendChild(fileref);
  });
}

function initializeSettings() {
  console.log("Initialising preferences...");
  store.set("theme", path.join(__dirname, "css/mono.css"));
  store.set("colorscheme", path.join(__dirname, "css/colors.css"));
  store.set("player", path.join(__dirname, "js/require/itunes.js"));
}

function loadSettings(settings = ["theme","colorscheme","player"]) {
  console.log("Loading preferences...");


  for (var i = 0; i < settings.length; i++) {
    var node = document.getElementById(settings[i]);
    if (node) {
      node.parentNode.removeChild(node);
    }

    try {
      let settingEM = new externalModule(store.get(settings[i]), settings[i]);
      let settingName = settingEM.fileName;
      settingEM.loadIn(document);
    } catch (e) {
    // Settings have not been initialised
    initializeSettings();
    loadSettings();
    }
  }

}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements;

    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val;
}

function setSettingButtonValue(option) {
  var settings = ["theme","colorscheme","player"];


  // Create array of externalModule objects
  for (var i = 0; i < settings.length; i++) {
    let settingEM = new externalModule(store.get(settings[i]));
    document.getElementById(settingEM.fileNameAndExtension).checked = true;
  }

}

function saveSettingButtonValue(option) {
  var fileName = getRadioVal(document.getElementById(option+"-form"));
  var filePath = path.join(__dirname, fileName);

  store.set(option, filePath);

}
