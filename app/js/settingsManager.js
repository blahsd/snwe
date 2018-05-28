'use strict';

function initializePywalLink(fileref) {
  var filepath = path.join(__dirname, "css/colors-wal.css");

  try {
    execSync("ln -s $HOME/.cache/wal/colors.css "+filepath);
  } catch (e) {
    // file exists.
  }
}

function initializeSettings() {
  console.log("Initialising preferences...");
  store.set("theme", path.join(__dirname, "css/mono.css"));
  store.set("colorscheme", path.join(__dirname, "css/colors.css"));
  store.set("player", path.join(__dirname, "js/require/itunes.js"));
}

function loadSettings(settings = ["theme","colorscheme","player"]) {
  console.log("Loading preferences...");
  initializePywalLink();

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
