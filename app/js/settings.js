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

function setSettings() {
  document.getElementById(store.get('theme')).checked = true;
}

function saveSettings() {
  store.set('theme',getRadioVal(document.getElementById("theme-form")));
}

window.onload=function() {
  setSettings();

  document.getElementById("theme-form").addEventListener("click", function(e) {
    saveSettings();
    require('electron').remote.getCurrentWebContents().emit("changeTheme");
  });
}
