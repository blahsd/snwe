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
      this.trackInfo = execSync("/usr/bin/osascript -e 'tell application \"Spotify\" to artist of current track & \" - \" name of current track as string'")
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
