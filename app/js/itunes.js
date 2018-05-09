var track;
var isplaying;

function playpause() {
  exec("osascript -e 'tell application \"iTunes\" to playpause'", function(err, stdout, stderr) {
  });
}

function next() {
  exec("osascript -e 'tell application \"iTunes\" to next track'", function(err, stdout, stderr) {
  });
}

function getTrack() {
  exec("osascript -e 'if application \"iTunes\" is running then tell application \"iTunes\" to if player state is playing then artist of current track & \" - \" & name of current track'", function(err, stdout, stderr) {
    track = stdout;
    //
  });
}

function isPlaying() {
  exec("osascript -e 'if application \"iTunes\" is running then tell application \"iTunes\" to if player state is playing then return true'", function(err, stdout, stderr) {
    isplaying = stdout.includes("true");
  });
}

function update() {
  getTrack();
  isPlaying();

  document.getElementById("player-output").innerHTML = track;

  console.log(isplaying);

  if (isplaying) {
    document.getElementById("play-icon").classList.remove("fa-play");
    document.getElementById("play-icon").classList.add("fa-pause");
  } else {
    document.getElementById("play-icon").classList.remove("fa-pause");
    document.getElementById("play-icon").classList.add("fa-play");
  }
}

setInterval(update, 1000);
