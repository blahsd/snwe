'use strict';

class mpdMusicPlayerInterface extends EventEmitter {
  constructor () {
    super();
  }

  playpause() {
    execSync('mpc toggle');
  }

  next() {
    execSync('mpc next');
  }

  get track() {
    return execSync("mpc status | sed -n 1p");
  }

  get playStatus() {
    var status;
    try {
      execSync("mpc status | grep playing");
      status = true;
    } catch (e) {
      status = false
    }
    return status;
  }

}
exports.musicPlayerInterface = mpdMusicPlayerInterface;
