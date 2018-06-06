'use strict';

class mpdMusicPlayerInterface extends EventEmitter {
  constructor (player) {
    super();

    this.player = player
    this.isPlaying = false
    this.trackInfo = 'Loading'
  }

  update() {
    try {
      this.isPlaying = execSync("mpc status | grep playing").includes('playing')
      this.trackInfo = execSync("mpc status | sed -n 1p").toString()
    } catch (e) {
      this.isPlaying = false
      this.trackInfo = ''
    }

  }

  playpause() {
    exec('mpc toggle')
  }

  next() {
    exec('mpc next');
  }

}
exports.musicPlayerInterface = mpdMusicPlayerInterface;
