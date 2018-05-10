function updateVolume() {
  loudness.getMuted(function(err, mute) {
    if (mute) {
      document.getElementById("volume-output").innerHTML = "Muted";
      document.getElementById("volume-icon").removeAttribute("class");
      document.getElementById("volume-icon").classList.add("fa");
      document.getElementById("volume-icon").classList.add("fa-volume-off");
      document.getElementById("volume").classList.add("dark");
    } else {
      loudness.getVolume(function(err, vol) {
        document.getElementById("volume-output").innerHTML = vol;
        document.getElementById("volume").classList.remove("dark");
        if (vol > 50) {
          document.getElementById("volume-icon").removeAttribute("class");
          document.getElementById("volume-icon").classList.add("fa");
          document.getElementById("volume-icon").classList.add("fa-volume-up");
        } else {
          document.getElementById("volume-icon").removeAttribute("class");
          document.getElementById("volume-icon").classList.add("fa");
          document.getElementById("volume-icon").classList.add("fa-volume-down");
        }
      });
    }
  });
}

setInterval(updateVolume, 1000);
