'use strict';

const {spawn } = require('child_process')

class spotifyMusicPlayerInterface extends EventEmitter {
  constructor (player) {
    super();

    this.player = player
    this.isPlaying = false
    this.trackInfo = '...'
  }

  update() {
    try {
      this.isPlaying = execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to player state as string'").includes('playing')
      var artist = execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to artist of current track as string'")
      var track = execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to name of current track as string'")
      this.trackInfo = artist + " - " + track
    } catch (e) {
      this.isPlaying = false
      this.trackInfo = ''
    }

  }

  playpause() {
    execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to playpause'")
  }

  next() {
    execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to next track'")
  }

}
exports.musicPlayerInterface = spotifyMusicPlayerInterface;
