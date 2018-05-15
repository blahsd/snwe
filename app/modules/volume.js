'use strict';

class volumeModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  update() {
    loudness.getMuted((err, mute) => {
      if (mute) {
        this.document.getElementById("volume-output").innerHTML = "Muted";
        this.document.getElementById("volume-icon").removeAttribute("class");
        this.document.getElementById("volume-icon").classList.add("fa");
        this.document.getElementById("volume-icon").classList.add("fa-volume-off");
        this.document.getElementById("volume").classList.add("dark");
      } else {
        loudness.getVolume((err, vol) => {
          this.document.getElementById("volume-output").innerHTML = vol;
          this.document.getElementById("volume").classList.remove("dark");
          if (vol > 50) {
            this.document.getElementById("volume-icon").removeAttribute("class");
            this.document.getElementById("volume-icon").classList.add("fa");
            this.document.getElementById("volume-icon").classList.add("fa-volume-up");
          } else {
            this.document.getElementById("volume-icon").removeAttribute("class");
            this.document.getElementById("volume-icon").classList.add("fa");
            this.document.getElementById("volume-icon").classList.add("fa-volume-down");
          }
        });
      }
    });
  }
}

exports.module = volumeModule;
