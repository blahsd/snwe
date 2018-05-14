'use strict';

function updateDate() {
  var now = new Date();
  document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");
}

document.getElementById("date-button").style.display = "none";
setInterval(updateDate, 1000);
