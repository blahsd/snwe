function logMessage(message) {
        alert(message);
    }


function getDate() {
  var dateFormat = require('dateformat');
  var now = new Date();

  document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");
}

function getTime() {
  var dateFormat = require('dateformat');
  var now = new Date();

  document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM:ss");
}

function update() {
  getDate();
  getTime();
}

setInterval(update, 1000);
