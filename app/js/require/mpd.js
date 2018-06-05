'use strict';

class mpdMusicPlayerInterface extends EventEmitter {
  constructor () {
    super();

    this.isPlaying = false
    this.trackInfo = 'asddad'
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
    execSync('mpc toggle');
  }

  next() {
    execSync('mpc next');
  }

}
exports.musicPlayerInterface = mpdMusicPlayerInterface;
