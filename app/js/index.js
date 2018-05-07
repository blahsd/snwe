const loudness = require('loudness');
const dateFormat = require('dateformat');
const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
const wifi = require('node-wifi');
const exec = require('child_process').exec;

var MPC = require('mpc-js').MPC;
var mpc = new MPC();
mpc.connectTCP('localhost', 6600);

function updateTimeDate() {
  var now = new Date();

  document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");

  document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM:ss");
}

function updateVolume() {
  loudness.getMuted(function (err, mute) {
    if (mute) {
      document.getElementById("volume-output").innerHTML = "Muted";
    } else {
      loudness.getVolume(function (err, vol) {
        document.getElementById("volume-output").innerHTML = vol;
      });
    }
  });
}

function updateBattery() {
  batteryLevel().then(level => {
    level = Math.round(100*level);
  	document.getElementById("battery-output").innerHTML = level;
  });

  isCharging().then(result => {
  	console.log(result);
  	//=> true
  });
}

function updateWifi() {
  wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null
  });

  wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        document.getElementById("wifi-output").innerHTML = err;
    } else {
      document.getElementById("wifi-output").innerHTML = currentConnections[0].ssid;
    }
    /*
    // you may have several connections
    [
        {
            iface: '...', // network interface used for the connection, not available on macOS
            ssid: '...',
            bssid: '...',
            mac: '...', // equals to bssid (for retrocompatibility)
            channel: <number>,
            frequency: <number>, // in MHz
            signal_level: <number>, // in dB
            security: '...' //
            security_flags: '...' // encryption protocols (format currently depending of the OS)
            mode: '...' // network mode like Infra (format currently depending of the OS)
        }
    ]
    */
  });
}

function updateDesktop() {
  dir = exec("echo $(/usr/local/bin/chunkc tiling::query -d id)", function(err, stdout, stderr) {
  if (err) {
    // should have err.code here?
  }
  document.getElementById("desktop-output").innerHTML = stdout;
  console.log(stdout);
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

// Activated by icons

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
