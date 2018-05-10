function updateDate() {
  var now = new Date();
  document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");
}

setInterval(updateDate, 1000);
