'use strict';

const {spawn } = require('child_process')

class mpdMusicPlayerInterface extends EventEmitter {
  constructor (player) {
    super();

    this.player = player
    this.isPlaying = false
    this.trackInfo = 'Loading track...'
  }

  update() {
    try {
      this.isPlaying = execSync("/usr/local/bin/mpc status | grep playing").includes('playing')
      this.trackInfo = execSync("/usr/local/bin/mpc status | sed -n 1p").toString()
    } catch (e) {
      this.isPlaying = false
      this.trackInfo = ''
    }

  }

  playpause() {
    execSync('/usr/local/bin/mpc toggle')
  }

  next() {
    execSync('/usr/local/bin/mpc toggle')
  }

}
exports.musicPlayerInterface = mpdMusicPlayerInterface;
