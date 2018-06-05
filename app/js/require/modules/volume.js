'use strict';

class volumeModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 1000;
  }

  getIcon() {
    // Get correct icon based on muted status and current volume level
    if (this.isMuted) {
      return "fa-volume-off";
    } else {
      if (this.level <= 50) {
        return "fa-volume-down";
      } else {
        return "fa-volume-up";
      }
    }
  }

  getColor() {
    // Get correct color based on muted status
    if (this.isMuted) {
      return "dark";
    } else {
      return false;
    }
  }

  updateIcon() {
    // Get the correct icon for the current status
    var icon = this.getIcon()

    // Check if the icon has changed (and therefore needs a redraw)
    if ($("#volume-icon").html() != icon) {
      // ... redraw the icon
      $("#volume-icon").html(`<i class="fa ${ icon }"></i>`)
      return true
    } else {
      return false
    }
  }

  updateColor() {
    // Get the correct color for the current status
    var color = this.getColor()

    // Check if the color has changed (and therefore needs a redraw)
    if (!$("#volume").hasClass(color)) {
      ["dark"].forEach(c => {
        $("#volume").removeClass(c)
      })
      $("#volume").addClass(color)
    }
  }

  updateOutput() {
    var level = this.level

    // Check if the level has changed (and therefore needs a redraw)
    if ($("#volume-output").html() != level) {
      $("#volume-output").html(level)
    }
  }

  updateStatus() {
    this.isMuted = execSync("sh ./app/sh/ismuted.sh").includes("true")
  }

  updateLevel() {
    this.level = execSync("sh ./app/sh/getvolume.sh").toString();
  }

  update() {
    this.updateStatus()
    this.updateLevel()
    this.updateIcon()
    this.updateColor()
    this.updateOutput()
  }
}

exports.module = volumeModule;
