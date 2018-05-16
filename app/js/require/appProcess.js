'use strict';

class appProcess {
  constructor(name) {
    this.name = name.trim().replace(/ /g,'');
  }

  get icon() {
    return this.getIcon();
  }

  get html() {
    return `<div class="button" id="taskbar-${this.name}-button">
    <i id="taskbar-${this.name}-icon" onclick="openApp('${this.name}')" class="${this.icon}"></i>
  </div>`
  }

  getIcon() {
    var icon = "far fa-window-maximize";
    switch (true) {
      case (this.name == "Finder"):
        icon = "far fa-window-restore";
        break;
      case (this.name == "Preview"):
        icon = "fas fa-eye-dropper";
        break;
      case (this.name == "Safari"):
        icon = "fa fa-compass";
        break;
      case (this.name == "iTunes"):
        icon = "fab fa-itunes-note";
        break;
      case (this.name == "Mail"):
        icon = "far fa-envelope";
        break;
      case (this.name == "ActivityMonitor"):
        icon = "far fa-window-close";
        break;
      case (this.name == "MicrosoftWord"):
        icon = "fas fa-file-word";
        break;
      case (this.name == "MicrosoftPowerPoint"):
        icon = "fas fa-file-powerpoint";
        break;
      case (this.name == "MicrosoftExcel"):
        icon = "fas fa-file-excel";
        break;
      case (this.name == "MicrosoftOutlook"):
        icon = "fas fa-file-outlook";

        break;
      case (this.name == "Atom"):
        icon = "fas fa-code";
        break;
      case (this.name == "SublimeText"):
        icon = "fas fa-code";
        break;
      case (this.name == "Hyper"):
        icon = "fas fa-terminal";
        break;
      case (this.name == "iTerm"):
        icon = "fas fa-terminal";
        break;
      case (this.name == "Terminal"):
        icon = "fas fa-terminal";
        break;
      case (this.name == "Spotify"):
        icon = "fab fa-spotify";
        break;
      case (this.name == "WhatsApp"):
        icon = "fab fa-whatsapp";
        break;
      case (this.name == "Airmail"):
        icon = "far fa-envelope";
        break;
      case (this.name == "Spark"):
        icon = "far fa-envelope"
      }
    return icon;
  }


}

exports.appProcess = appProcess;
