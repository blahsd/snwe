const loudness = require('loudness');
const dateFormat = require('dateformat');
const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const wifi = require('node-wifi');
const exec = require('child_process').exec;
const osxBattery = require('osx-battery');
const Store = require('electron-store');
var MPC = require('mpc-js').MPC;

const store = new Store();

var options = ["theme", "colorscheme"];

var mpc = new MPC();
mpc.connectTCP('localhost', 6600);

//  Useful Functions

function loadjscssfile(filename) {
  filename = "./css/" + filename;
  filetype = "css";

  console.log("Loading file "+filename)

  var fileref = document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)

  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref)
  }
}

function initializePreferences() {
  console.log("Initialising preferences...");
  store.set("theme", "center.css");
  store.set("colorscheme", "colors.css");
}

function loadPreferences() {
  console.log("Checking for initialisation of preferences...");
  for (var i = 0; i < options.length; i++) {
    if (store.get(options[i]) == undefined) {
      initializePreferences();
    }
  }

  console.log("Loading preferences...")
  loadjscssfile(store.get('theme'));
  loadjscssfile(store.get('colorscheme'));
}

// Update Functions

function updateTimeDate() {
  var now = new Date();

  document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");

  document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM");
}

function updateVolume() {
  loudness.getMuted(function(err, mute) {
    if (mute) {
      document.getElementById("volume-output").innerHTML = "Muted";
      document.getElementById("volume-icon").removeAttribute("class");
      document.getElementById("volume-icon").classList.add("fa");
      document.getElementById("volume-icon").classList.add("fa-volume-off");
      document.getElementById("volume").classList.add("dark");
    } else {
      loudness.getVolume(function(err, vol) {
        document.getElementById("volume-output").innerHTML = vol;
        if (vol > 50) {
          document.getElementById("volume-icon").removeAttribute("class");
          document.getElementById("volume-icon").classList.add("fa");
          document.getElementById("volume-icon").classList.add("fa-volume-up");
        } else {
          document.getElementById("volume-icon").removeAttribute("class");
          document.getElementById("volume-icon").classList.add("fa");
          document.getElementById("volume-icon").classList.add("fa-volume-down");
        }
      });
    }
  });
}

function updateBattery() {
  isCharging().then(result => {
    batteryLevel().then(level => {
      level = Math.round(100 * level);

      document.getElementById("battery-output").innerHTML = level;
      document.getElementById("battery-icon").removeAttribute("class");

      if (result == true) {
        document.getElementById("battery-icon").classList.add("fas");
        color = "yellow"
        icon = "fa-bolt";
      } else {
        document.getElementById("battery-icon").classList.add("fa");
        color = "green";
        switch (true) {
          case (level <= 10):
            icon = "fa-battery-empty";
            color = "red";
            break;
          case (level <= 25):
            icon = "fa-battery-quarter";
            color = "yellow";
            break;
          case (level <= 50):
            icon = "fa-battery-half";
            break;
          case (level <= 75):
            icon = "fa-battery-three-quarters";
            break;
          case (level <= 100):
            icon = "fa-battery-full";
            break;
        }
      }

      document.getElementById("battery-icon").classList.add(icon);
      document.getElementById("battery").classList.add(color);
    });
  });
}

function updateWifi() {
  wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });

  wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
      document.getElementById("wifi-output").innerHTML = err;
    } else {

      try {
        document.getElementById("wifi-icon").classList.remove("blinking");
        document.getElementById("wifi").classList.remove("dark");
        document.getElementById("wifi-output").innerHTML = currentConnections[0].ssid;
      } catch (err) {
        document.getElementById("wifi-output").innerHTML = "WiFi Off"
        document.getElementById("wifi-icon").classList.remove("blinking");
        document.getElementById("wifi").classList.add("dark");
      }

      if (currentConnections[0].ssid.length <= 1) {
        document.getElementById("wifi-output").innerHTML = "Connecting..."
        document.getElementById("wifi-icon").classList.add("blinking");
      }
    }
  });
}

function updateDesktop() {
  dir = exec("echo $(/usr/local/bin/chunkc tiling::query -d id)", function(err, stdout, stderr) {
    if (err) {
      // should have err.code here?
    }
    document.getElementById("desktop-output").innerHTML = stdout;
  });
}

// Event Listeners

mpc.on('changed-player', () => {
  mpc.status.status().then(status => {
    if (status.state == 'play') {
      mpc.status.currentSong().then(song => document.getElementById("player-output").innerHTML = song.artist + ' - ' + song.title);

      document.getElementById("play-icon").classList.remove("fa-play");
      document.getElementById("play-icon").classList.add("fa-pause");
    } else {
      mpc.status.currentSong().then(song => document.getElementById("player-output").innerHTML = "Paused");
      document.getElementById("play-icon").classList.remove("fa-pause");
      document.getElementById("play-icon").classList.add("fa-play");
    }
  });
});

// Button Press

function playpause() {
  mpc.status.status().then(status => {
    if (status.state == 'play') {
      mpc.playback.pause();
    } else {
      mpc.playback.play();
    }
  })
}


function next() {
  mpc.playback.next();
}

// Update function

function update() {
  updateTimeDate();
  updateVolume();
  updateBattery();
  updateWifi();
  updateDesktop();
}

setInterval(update, 1000);
