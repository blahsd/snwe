'use strict';

class batteryModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'left';
    this.refreshRate = 4000;
  }

  getIcon() {
    if (this.isCharging) {
      return "fa-bolt";
    } else {
      switch (true) {
        case (this.level <= 10):
          return "fa-battery-empty";
          break;
        case (this.level <= 25):
          return "fa-battery-quarter";
          break;
        case (this.level <= 50):
          return "fa-battery-half";
          break;
        case (this.level <= 75):
          return "fa-battery-three-quarters";
          break;
        case (this.level <= 100):
          return "fa-battery-full";
          break;
      }
    }
  }

  getColor() {
    if (this.isCharging) {
      return "yellow";
    } else {
      switch (true) {
        case (this.level <= 10):
          return "red";
          break;
        case (this.level <= 30):
          return "yellow";
          break;
        case (this.level <= 100):
          return "green";
          break;
      }
    }
  }

  updateIcon() {
    // Get the correct icon for the current status
    var icon = this.getIcon()

    // Check if the icon has changed (and therefore needs a redraw)
    if ($("#battery-icon").html() != icon) {
      // ... redraw the icon
      $("#battery-icon").html(`<i class="fa ${ icon }"></i>`)
      return true
    } else {
      return false
    }
  }

  updateColor() {
    // Get the correct color for the current status
    var color = this.getColor()

    // Check if the color has changed (and therefore needs a redraw)
    if (!$("#battery-icon").hasClass(color)) {
      ["red","yellow","green"].forEach(c => {
        $("#battery-icon").removeClass(c)
      })
      $("#battery-icon").addClass(color)
    }
  }

  updateOutput() {
    var level = this.level

    if ($("#battery-output").html() != level) {
      $("#battery-output").html(level)
    }
  }

  updateStatus(isCharging) {
    this.updateIcon()
    this.updateColor()
    this.isCharging = execSync("sh ./app/sh/ischarging.sh").includes("true");
  }

  updateLevel(level) {
    this.updateIcon()
    this.updateColor()
    this.updateOutput()
    this.level = Math.ceil(100*level)
  }

  update() {
    this.updateStatus();
    batteryLevel().then(level => this.updateLevel(level));
  }

}

exports.module = batteryModule;
