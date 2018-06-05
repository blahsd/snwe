'use strict';

class batteryModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 4000;
  }

  getIcon() {
    // Get correct icon based on charging status and current charge level
    if (this.isCharging) {
      return "fa-bolt";
    } else {
      if (this.level <= 10) {
        return "fa-battery-empty";
      } else if (this.level <= 25) {
        return "fa-battery-quarter";
      } else if (this.level <= 50) {
        return "fa-battery-half";
      } else if (this.level <= 75) {
        return "fa-battery-three-quarters";
      } else {
        return "fa-battery-full";
      }
    }
  }

  getColor() {
    // Get correct color based on charging status and current charge level
    if (this.isCharging) {
      return "yellow";
    } else {
      if (this.level <= 10) {
        return "red";
      } else if (this.level <= 30) {
        return "yellow";
      } else {
        return "green";
      }
    }
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

    // Check if the level has changed (and therefore needs a redraw)
    if ($("#battery-output").html() != level) {
      $("#battery-output").html(level)
    }
  }

  updateStatus() {
    this.isCharging = execSync("sh ./app/sh/ischarging.sh").includes("true")
  }

  updateLevel() {
    this.level = execSync("sh ./app/sh/getcharge.sh").toString();
  }

  update() {
    this.updateStatus();
    this.updateLevel();
    this.updateIcon()
    this.updateColor()
    this.updateOutput()
  }

}

exports.module = batteryModule;
