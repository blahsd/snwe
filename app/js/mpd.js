'use strict';

var MPC = require('mpc-js').MPC;
var mpc = new MPC();
mpc.connectTCP('localhost', 6600);


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

function update() {
  //nothing.
}
