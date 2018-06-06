'use strict';

class batteryModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 4000;
    this.scriptGetCharge = path.join(__dirname, "../../../sh/getcharge.sh");
    this.scriptIsCharging = path.join(__dirname, "../../../sh/ischarging.sh");
  }

  get icon() {
    // Get correct icon based on charging status and current charge level
    var fa
    var le = this.level.replace( /%/g, "" )

    if (this.isCharging) {
      fa = "fa fa-bolt";
    } else {
      if (le <= 10) {
        fa = "fa fa-battery-empty";
      } else if (le <= 25) {
        fa = "fa fa-battery-quarter";
      } else if (le <= 50) {
        fa = "fa fa-battery-half";
      } else if (le <= 75) {
        fa = "fa fa-battery-three-quarters";
      } else if (le > 75){
        fa = "fa fa-battery-full";
      }
    }
    return `<i class="${ fa }"></i>`
  }

  get color() {
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

  updateStatus() {
    this.isCharging = execSync(`sh ${this.scriptIsCharging}`).includes("true")
    this.level = execSync(`sh ${this.scriptGetCharge}`).toString();
  }

  update() {
    this.updateStatus();

    this.updateElementProperty($("#battery"), this.color, ["red","yellow","green"])
    this.updateContent($("#battery-icon"), this.icon)
    this.updateContent($("#battery-output"), this.level)
  }
}

exports.module = batteryModule;
