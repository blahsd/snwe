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
  const settings = ["theme","colorscheme","player"];

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

function setSettingButtonListener() {
  const buttons = ["player", "theme", "colorscheme"];

  buttons.forEach( button => {
    document.getElementById(`${button}-form`).addEventListener("click", function(e) {
      saveSettingButtonValue(`${button}`);
      require('electron').remote.getCurrentWebContents().emit("changeSettingEvent");
      loadSettings();
    })
  })
}

window.onload=function() {

  loadSettings(["theme","colorscheme"]);
  setSettingButtonValue();
  setSettingButtonListener();

  /*
  document.getElementById("theme-form").addEventListener("click", function(e) {
    saveSettingButtonValue("theme");
    require('electron').remote.getCurrentWebContents().emit("changeSettingEvent");
    console.log(document.title + " emitted a changeSettingEvent event!")
    loadSettings();
  });

  document.getElementById("colorscheme-form").addEventListener("click", function(e) {
    saveSettingButtonValue("colorscheme");
    require('electron').remote.getCurrentWebContents().emit("changeSettingEvent");
    console.log(document.title + " emitted a changeSettingEvent event!")
    loadSettings();
  })

  document.getElementById("player-form").addEventListener("click", function(e) {
    saveSettingButtonValue("player");
    require('electron').remote.getCurrentWebContents().emit("changeSettingEvent");
    console.log(document.title + " emitted a changeSettingEvent event!");
    loadSettings();
  })
  */
}
