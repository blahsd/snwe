/* jshint node: true */
'use strict';

const {execSync} = require('child_process');

class iTunesMusicPlayerInterface {
  constructor(player) {
    this.player = player;
    this.isPlaying = false;
    this.trackInfo = '...';
  }

  update() {
    try {
      this.isPlaying = execSync("/usr/bin/osascript -e 'tell application \"iTunes\" to player state as string'").includes('playing');
      var artist = execSync("/usr/bin/osascript -e 'tell application \"iTunes\" to artist of current track as string'");
      var track = execSync("/usr/bin/osascript -e 'tell application \"iTunes\" to name of current track as string'");
      this.trackInfo = artist + " - " + track;
    } catch (e) {
      this.isPlaying = false;
      this.trackInfo = '';
    }
  }

  playpause() {
    execSync("/usr/bin/osascript -e 'tell application \"iTunes\" to playpause'");
  }

  next() {
    execSync("/usr/bin/osascript -e 'tell application \"iTunes\" to next track'");
  }
}

exports.musicPlayerInterface = iTunesMusicPlayerInterface;
