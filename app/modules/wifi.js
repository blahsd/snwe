'use strict';

class wifiModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';

    this.availableNetworks = [];
    this.isscancomplete = false;
    this.iswifion = false;

    wifi.init({
      iface: null // network interface, choose a random wifi interface if set to null
    });

  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" id="${moduleName}">
        <div class="button" onclick= "toggleClass(document.getElementById('wifi-popup'), 'open');" id="${moduleName}-button">
          <i id="${moduleName}-icon"></i>
        </div>
        <span class="output" id="${moduleName}-output"> ... </span>
        <div class="popup" id="${moduleName}-popup">
        </div>
      </div>`
  }

  scanWifi() {
    var availableNetworks = [];
    wifi.scan(function(err, networks) {
        if (err) {
            console.log(err);
        } else {
            networks.forEach(network => {
              contentItem = `<li class="button">${network.ssid}</li>`
              document.getElementById("wifi-optlist").insertAdjacentHTML("beforeend", contentItem);
            });
        }
    });
  }

  turnWifiOff() {
    exec("networksetup -setairportpower en1 off", function(err, stdout, stderr) {
      //
    });
  }

  turnWifiOn() {
    exec("networksetup -setairportpower en1 on", function(err, stdout, stderr) {
      //
    });
  }

  setWifiOnOffButton() {
    if (this.iswifion == true) {
      this.document.getElementById("wifi-toggle-button").innerHTML = "Turn WiFi On";
    } else {
      this.document.getElementById("wifi-toggle-button").innerHTML = "Turn WiFi Off";
  }
  }

  toggleWifiPopup() {
    toggleClass(document.getElementById("wifi-popup"), "open");
  }

  toggleWifi() {
    if (this.iswifion == true) {
      console.log("Turning Wifi On..");
      this.turnWifiOff();
    } else {
      console.log("Turning Wifi Off..");
      this.turnWifiOn();
    }
    this.setWifiOnOffButton();
    this.toggleWifiPopup();
  }

  setPopupContent() {
    // This is broken. Breaks everything. wtf. idk. bruh.
    this.document.getElementById("wifi-popup").innerHTML = "";
    this.success = true;

    var content = `<ul class="optlist" id="wifi-optlist">
          <li class="button" id="wifi-toggle-button" onclick="toggleWifi()"></li>
        </ul>`
    this.document.getElementById("wifi-popup").insertAdjacentHTML("afterbegin", content);

    //scanWifi();
  }


  update() {
    wifi.getCurrentConnections((err, currentConnections) => {
          this.document.getElementById("wifi-icon").classList.add("fas");
          this.document.getElementById("wifi-icon").classList.add("fa-wifi");
      if (err) {
        this.document.getElementById("wifi-output").innerHTML = "Error: "+err;
      } else {
        try {
          this.document.getElementById("wifi-icon").classList.remove("blinking");
          this.document.getElementById("wifi").classList.remove("dark");
          this.document.getElementById("wifi-output").innerHTML = currentConnections[0].ssid;
          this.iswifion = true;
        } catch (err) {
          this.document.getElementById("wifi-output").innerHTML = "WiFi Off"
          this.document.getElementById("wifi-icon").classList.remove("blinking");
          this.document.getElementById("wifi").classList.add("dark");
          this.iswifion = false;
        }

        try {
          if (currentConnections[0].ssid.length <= 1) {
            this.document.getElementById("wifi-output").innerHTML = "Connecting..."
            this.document.getElementById("wifi-icon").classList.add("blinking");
          }
        } catch (err) {
          return false;
        }
      }
    });

    //    this.setPopupContent();
    //    this.setWifiOnOffButton();
  }
}

exports.module = wifiModule;
