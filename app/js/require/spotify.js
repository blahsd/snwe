'use strict';


class spotifyMusicPlayerInterface extends EventEmitter {
  constructor () {
    super();
  }

  playpause() {
    exec("osascript -e 'tell application \"Spotify\" to playpause'", function(err, stdout, stderr) {
    });
  }

  next() {
    exec("osascript -e 'tell application \"Spotify\" to next track'", function(err, stdout, stderr) {
    });
  }

  get track() {
    return execSync("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to if player state is playing then artist of current track & \" - \" & name of current track'");
  }

  get playStatus() {
    return execSync("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to if player state is playing then return true'").includes("true");
  }

}

exports.musicPlayerInterface = spotifyMusicPlayerInterface;
