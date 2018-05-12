var apps;
var appBlacklist = ["osascript","Electron"];

function getRunningApps() {
  exec("osascript -e 'tell application \"System Events\" to name of every process whose background only is false'", function(err, stdout, stderr) {
    apps = stdout.split(", ");
  });
}

function getAppIcon(processName) {
  icon = "far fa-window-restore";
  switch (true) {
    case (processName == "Finder"):
      icon = "far fa-window-restore";
      break;
    case (processName == "Preview"):
      icon = "fas fa-eye-dropper";
      break;
    case (processName == "Safari"):
      icon = "fa fa-compass";
      break;
    case (processName == "iTunes"):
      icon = "fab fa-itunes-note";
      break;
    case (processName == "Mail"):
      icon = "far fa-envelope";
      break;
    case (processName == "ActivityMonitor"):
      icon = "far fa-window-close";
      break;
    case (processName == "MicrosoftWord"):
      icon = "fas fa-file-word";
      break;
    case (processName == "MicrosoftPowerPoint"):
      icon = "fas fa-file-powerpoint";
      break;
    case (processName == "MicrosoftExcel"):
      icon = "fas fa-file-excel";
      break;
    case (processName == "MicrosoftOutlook"):
      icon = "fas fa-file-outlook";

      break;
    case (processName == "Atom"):
      icon = "fas fa-code";
      break;
    case (processName == "SublimeText"):
      icon = "fas fa-code";
      break;
    case (processName == "Hyper"):
      icon = "fas fa-terminal";
      break;
    case (processName == "iTerm"):
      icon = "fas fa-terminal";
      break;
    case (processName == "Terminal"):
      icon = "fas fa-terminal";
      break;
    case (processName == "Spotify"):
      icon = "fab fa-spotify";
      break;
    case (processName == "WhatsApp"):
      icon = "fab fa-whatsapp";
      break;
    case (processName == "Airmail"):
      icon = "far fa-envelope";
      break;
    case (processName == "Spark"):
      icon = "far fa-envelope"
    }
  return (icon);
}


function getAppPath(app) {
  return `/Applications/${app}.app`;
}

function openApp(app) {
  command = "open -a " + app;
  exec(command, function(err, stdout, stderr) {
  });
}

function setAppsIcons() {
  document.getElementById("taskbar-output").innerHTML = "";

  try {
    apps.forEach(app => {
      app = app.trim();
      if (app == "Electron" || app == "osascript") {
        return;
      }

      var appIcon = getAppIcon(app);
      var appPath = getAppPath(app);

      content = `<div class="button" id="taskbar-${app}-button">
      <i id="taskbar-${app}-icon" onclick="openApp('${app}')" class="${appIcon}"></i>
    </div>`
      document.getElementById("taskbar-output").insertAdjacentHTML("afterbegin", content);
    })
  } catch (err) {
    console.log("Running processes are not yet available.");
  }

  //scanWifi();
}

function updateTaskbar() {
  document.getElementById("taskbar-button").style.display = "none";
  getRunningApps();
  setAppsIcons();
}

setInterval(updateTaskbar, 4000);
