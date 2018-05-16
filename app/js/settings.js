

window.onload=function() {

  loadSettings(["theme","colorscheme"]);
  setSettingButtonValue();

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
}
