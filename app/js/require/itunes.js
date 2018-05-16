'use strict';


class iTunesMusicPlayerInterface extends EventEmitter {
  constructor () {
    super();
  }

  playpause() {
    exec("osascript -e 'tell application \"iTunes\" to playpause'", function(err, stdout, stderr) {
    });
  }

  next() {
    exec("osascript -e 'tell application \"iTunes\" to next track'", function(err, stdout, stderr) {
    });
  }

  get track() {
    return execSync("osascript -e 'if application \"iTunes\" is running then tell application \"iTunes\" to if player state is playing then artist of current track & \" - \" & name of current track'");
  }

  get playStatus() {
    return execSync("osascript -e 'if application \"iTunes\" is running then tell application \"iTunes\" to if player state is playing then return true'").includes("true");
  }

}

exports.musicPlayerInterface = iTunesMusicPlayerInterface;
