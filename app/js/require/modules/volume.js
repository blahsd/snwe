/* jshint node: true */
'use strict';

/* global
  $, require, exports, __dirname */

const path = require('path');
const {execSync} = require('child_process');
const ExternalModule = require( path.resolve('./app/js/require/ExternalModule.js')).ExternalModule;

class volumeModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
    this.refreshRate = 2000;
    this.scriptGetVolume = path.join(__dirname, "../../../sh/getvolume.sh");
    this.scriptIsMuted = path.join(__dirname, "../../../sh/ismuted.sh");
  }

  get icon() {
    // Get correct icon based on muted status and current volume level
    var fa;

    if (this.isMuted) {
      fa = "fa fa-volume-off";
    } else {
      if (this.level <= 50) {
        fa = "fa fa-volume-down";
      } else {
        fa = "fa fa-volume-up";
      }
    }
    return `<i class="${ fa }"></i>`;
  }

  get color() {
    // Get correct color based on muted status
    if (this.isMuted) {
      return "dark";
    } else {
      return false;
    }
  }

  mute() {
    execSync("osascript -e 'set volume output muted true'");
    this.isMuted = true;
    this.update();
    }

  unmute() {
    execSync("osascript -e 'set volume output muted false'");
    this.isMuted = false;
    this.update();
  }

  toggle() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  updateOutput() {
    var level = this.level;

    // Check if the level has changed (and therefore needs a redraw)
    if ($("#volume-output").html() != level) {
      $("#volume-output").html(level);
    }
  }

  updateStatus() {
    this.isMuted = execSync(`sh ${this.scriptIsMuted}`).includes("true");

    if (this.isMuted) {
      this.level = "Muted";
    } else {
      this.level = execSync(`sh ${this.scriptGetVolume}`).toString();
    }
  }

  update() {
    this.updateStatus();

    this.updateElementProperty($("#volume"), this.color, ["dark"]);
    this.updateContent($("#volume-icon"), this.icon);
    this.updateContent($("#volume-output"), this.level);

  }

  start() {
    this.update();
    $("#volume-button").on("click", this.toggle.bind(this));

    var _this = this;
    setInterval(() => { _this.update(); }, this.refreshRate);
  }
}

exports.module = volumeModule;
