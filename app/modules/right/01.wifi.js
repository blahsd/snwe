var availableNetworks = [];
var isscancomplete = false;
iswifion = false;

wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

function updateWifi() {

  wifi.getCurrentConnections(function(err, currentConnections) {
        document.getElementById("wifi-icon").classList.add("fas");
        document.getElementById("wifi-icon").classList.add("fa-wifi");
    if (err) {
      document.getElementById("wifi-output").innerHTML = "Error: "+err;
    } else {
      try {
        document.getElementById("wifi-icon").classList.remove("blinking");
        document.getElementById("wifi").classList.remove("dark");
        document.getElementById("wifi-output").innerHTML = currentConnections[0].ssid;
        iswifion = true;
      } catch (err) {
        document.getElementById("wifi-output").innerHTML = "WiFi Off"
        document.getElementById("wifi-icon").classList.remove("blinking");
        document.getElementById("wifi").classList.add("dark");
        iswifion = false;
      }

      try {
        if (currentConnections[0].ssid.length <= 1) {
          document.getElementById("wifi-output").innerHTML = "Connecting..."
          document.getElementById("wifi-icon").classList.add("blinking");
        }
      } catch (err) {
        return false;
      }
    }
  });
}

function scanWifi() {
  availableNetworks = [];
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

function turnWifiOff() {
  exec("networksetup -setairportpower en1 off", function(err, stdout, stderr) {
    //
  });
}

function turnWifiOn() {
  exec("networksetup -setairportpower en1 on", function(err, stdout, stderr) {
    //
  });
}

function setWifiOnOffButton() {
  if (iswifion == true) {
    document.getElementById("wifi-toggle-button").innerHTML = "Turn WiFi On";
  } else {
    document.getElementById("wifi-toggle-button").innerHTML = "Turn WiFi Off";
  }
}

function toggleWifiPopup() {
  toggleClass(document.getElementById("wifi-popup"), "open");
}

function toggleWifi() {
  if (iswifion == true) {
    console.log("Turning Wifi On..");
    turnWifiOff();
  } else {
    console.log("Turning Wifi Off..");
    turnWifiOn();
  }
  setWifiOnOffButton();
  toggleWifiPopup();
}

function setPopupContent() {
  document.getElementById("wifi-popup").innerHTML = "";

  content = `<ul class="optlist" id="wifi-optlist">
        <li class="button" id="wifi-toggle-button" onclick="toggleWifi()"></li>
      </ul>`
  document.getElementById("wifi-popup").insertAdjacentHTML("afterbegin", content);

  //scanWifi();
}

document.getElementById("wifi-button").onclick = function() {
  toggleClass(document.getElementById("wifi-popup"), "open");
}

setInterval(updateWifi, 1000);
setPopupContent();
setWifiOnOffButton();
