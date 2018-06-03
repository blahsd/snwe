'use strict';

class volumeModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 6000;
  }

  update() {
    loudness.getMuted((err, mute) => {
      if (mute) {

        if (document.getElementById("volume-output").innerHTML == "Muted") {
          return;
        }

        document.getElementById("volume-output").innerHTML = "Muted";
        document.getElementById("volume-icon").removeAttribute("class");
        document.getElementById("volume-icon").classList.add("fa");
        document.getElementById("volume-icon").classList.add("fa-volume-off");
        document.getElementById("volume").classList.add("dark");
      } else {
        loudness.getVolume((err, vol) => {

          if (document.getElementById("volume-output").innerHTML == vol) {
            return;
          }
          
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
}

exports.module = volumeModule;
