'use strict';

function initializePywalLink(fileref) {
  exec("ln -s $HOME/.cache/wal/colors.css ./app/css/colors-wal.css", function(err, stdout, stderr) {
  document.getElementsByTagName("head")[0].appendChild(fileref);
  });
}

function initializeSettings() {
  console.log("Initialising preferences...");
  store.set("theme", new externalModule(path.join(__dirname, "css/mono.css")));
  store.set("colorscheme", new externalModule(path.join(__dirname, "css/colors.css")));
  store.set("player", new externalModule(path.join(__dirname, "js/itunes.js")));
}

function loadSettings(settings = ["theme","colorscheme","player"]) {
  console.log("Loading preferences...");

  for (var i = 0; i < settings.length; i++) {
    let settingEM = new externalModule(store.get(settings[i])['filePath']);
    let settingName = settingEM.fileName;
    settingEM.loadIn(document);
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

  console.log("Loading preferences...");

  // Create array of externalModule objects
  for (var i = 0; i < settings.length; i++) {
    let settingEM = new externalModule(store.get(settings[i])['filePath']);

    console.log(settingEM.fileNameAndExtension);
    document.getElementById(settingEM.fileNameAndExtension).checked = true;
  }

}

function saveSettingButtonValue(option) {
  var fileName = getRadioVal(document.getElementById(option+"-form"));
  var filePath = path.join(__dirname, fileName);

  var eM = new externalModule(filePath);

  store.set(option, eM);
}
