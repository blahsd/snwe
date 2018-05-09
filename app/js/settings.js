const Store = require('electron-store');
const store = new Store();

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
    return val; // return value of checked radio or undefined if none checked
}

var options = ["theme", "colorscheme","player"]

function setSetting(option) {
  console.log("Setting: "+option+" to: "+store.get(option))
  document.getElementById(store.get(option)).checked = true;
}

function saveSetting(option) {
  store.set(option,getRadioVal(document.getElementById(option+"-form")));
}

window.onload=function() {
  loadSettings();

  console.log("Setting up preference Panes...");
  for (var i = 0; i < options.length; i++) {
    var o = options[i]
    var oform = o + "-form";

    setSetting(o);
  }

  document.getElementById("theme-form").addEventListener("click", function(e) {
    saveSetting("theme");
    require('electron').remote.getCurrentWebContents().emit("changeTheme");
    console.log(document.title + " emitted a changeTheme event!")
    loadSettings();
  });

  document.getElementById("colorscheme-form").addEventListener("click", function(e) {
    saveSetting("colorscheme");
    require('electron').remote.getCurrentWebContents().emit("changeTheme");
    console.log(document.title + " emitted a changeTheme event!")
    loadSettings();
  })

  document.getElementById("player-form").addEventListener("click", function(e) {
    saveSetting("player");
    require('electron').remote.getCurrentWebContents().emit("changeTheme");
    console.log(document.title + " emitted a changeTheme event!");
    loadSettings();
  })
}
