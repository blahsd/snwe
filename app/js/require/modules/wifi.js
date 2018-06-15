/* jshint node: true */
'use strict';

/* global
$, require, exports, __dirname, setInterval */

const path = require('path');
const wifi = require('node-wifi');
const {exec} = require('child_process');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;


class wifiModule extends ExternalModule {
  constructor(filePath, document) {
    super(filePath, document);
    this.container = 'right';

    this.isOn = false;
    this.isConnected = false;
    this.isConnecting = true;
    this.network = false;

    wifi.init({
      iface: null // network interface, choose a random wifi interface if set to null
    });

  }

  get icon() {
    var fa;
    // Get correct icon based on charging status and current charge level
    if (this.isConnected || this.isConnecting) {
      fa = "fa fa-wifi";
    } else {
      fa = "fa fa-wifi"; // this should be a different icon
    }

    return `<i class="${ fa }"></i>`;
  }

  get color() {
    // Get correct color based on connected status
    if (!this.isConnected && !this.isConnecting) {
      return "dark";
    }
  }

  get animation() {
    // Get correct animation based on connecting status
    if (this.isConnecting) {
      return "blinking";
    }
  }

  updateStatus() {
    wifi.getCurrentConnections((err, currentConnections) => {
      try {
        if (currentConnections[0].ssid.length <= 1) {
          // Is connecting
          this.isOn = false;
          this.isConnected = false;
          this.isConnecting = true;
          this.network = "Connecting...";
        } else {
          this.isOn = true;
          this.isConnected = true;
          this.isConnecting = false;
          this.network = currentConnections[0].ssid;
        }
      } catch (e) {
        // If no currentConnections are returned, it must mean we're disconnected and not in the process of connecting to anything
        this.isOn = false;
        this.isConnected = false;
        this.isConnecting = false;
        this.network = "Wifi Off";
      }
    });
  }

  update() {
    this.updateStatus();

    this.updateElementProperty($("#wifi"), this.color, ["dark"]);
    this.updateContent($("#wifi-icon"), this.icon);
    this.updateElementProperty($("#wifi-icon"), this.animation, ["blinking"]);
    this.updateContent($("#wifi-output"), this.network);
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return `
    <div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-button">
        <i id="${moduleName}-icon"></i>
      </div>

      <span class="output" id="${moduleName}-output"> ... </span>

      <div class="popup" id="${this.fileName}-popup">
        <div class="button wifi-button" value="on" id="on-wifi-button">
          on
        </div>|
        <div class="button wifi-button" value="off" id="off-wifi-button">
          off
        </div>
      </div>
    </div>`;
  }

  start() {
    var _this = this;

    $(`#${this.fileName}-button`).on("click", () => {
      $(`#${this.fileName}-popup`).toggleClass("open");
      //this.updateElementProperty($('.wifi-button'), "selected", ["selected"]);
    });

    $(`.${this.fileName}-button`).on("click", function() {
      exec(`networksetup -setairportpower en1 ${ this.getAttribute('value') }`);
    });

    this.update();
    this.intervalID = setInterval(() => {
      _this.update();
    }, this.refreshRate);
  }
}

exports.module = wifiModule;
