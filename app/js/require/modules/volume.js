'use strict';

class volumeModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 1000;
    this.scriptGetVolume = path.join(__dirname, "../../../sh/getvolume.sh");
    this.scriptIsMuted = path.join(__dirname, "../../../sh/ismuted.sh");
  }

  get icon() {
    // Get correct icon based on muted status and current volume level
    var fa

    if (this.isMuted) {
      fa = "fa fa-volume-off";
    } else {
      if (this.level <= 50) {
        fa = "fa fa-volume-down";
      } else {
        fa = "fa fa-volume-up";
      }
    }
    return `<i class="${ fa }"></i>`
  }

  get color() {
    // Get correct color based on muted status
    if (this.isMuted) {
      return "dark";
    } else {
      return false;
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
    this.isMuted = execSync(`sh ${this.scriptIsMuted}`).includes("true")

    if (this.isMuted) {
      this.level = "Muted"
    } else {
      this.level = execSync(`sh ${this.scriptGetVolume}`).toString();
    }
  }

  update() {
    this.updateStatus()

    this.updateElementProperty($("#volume"), this.color, ["dark"])
    this.updateContent($("#volume-icon"), this.icon)
    this.updateContent($("#volume-output"), this.level)

  }
}

exports.module = volumeModule;
