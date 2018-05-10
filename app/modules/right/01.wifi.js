function updateWifi() {
  wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });

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
      } catch (err) {
        document.getElementById("wifi-output").innerHTML = "WiFi Off"
        document.getElementById("wifi-icon").classList.remove("blinking");
        document.getElementById("wifi").classList.add("dark");
      }

      if (currentConnections[0].ssid.length <= 1) {
        document.getElementById("wifi-output").innerHTML = "Connecting..."
        document.getElementById("wifi-icon").classList.add("blinking");
      }
    }
  });
}

setInterval(updateWifi, 1000);
