'use strict';

function updateBattery() {
  isCharging().then(result => {
    batteryLevel().then(level => {
      level = Math.ceil(100 * level);
      var color;
      var icon;

      document.getElementById("battery-output").innerHTML = level;
      document.getElementById("battery-icon").removeAttribute("class");

      if (result == true) {
        document.getElementById("battery-icon").classList.add("fas");
        color = "yellow"
        icon = "fa-bolt";
      } else {
        document.getElementById("battery-icon").classList.add("fa");
        color = "green";
        switch (true) {
          case (level <= 10):
            icon = "fa-battery-empty";
            color = "red";
            break;
          case (level <= 25):
            icon = "fa-battery-quarter";
            color = "yellow";
            break;
          case (level <= 50):
            icon = "fa-battery-half";
            break;
          case (level <= 75):
            icon = "fa-battery-three-quarters";
            break;
          case (level <= 100):
            icon = "fa-battery-full";
            break;
        }
      }

      document.getElementById("battery-icon").classList.add(icon);
      document.getElementById("battery-icon").classList.add(color);
    });
  });
}

setInterval(updateBattery, 1000)
