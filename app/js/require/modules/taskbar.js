'use strict';

class taskbarModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'left';

    this.tm = new TaskMonitor(1000);
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" id="${moduleName}">
        <span class="output" id="${moduleName}-output"></span>
        </div>
      </div>`
  }

  start() {
    this.tm.start(1000);

    this.tm.on('appEvent', (app, openStatus) => {
      if (openStatus == true) {
        document.getElementById("taskbar-output").insertAdjacentHTML("afterbegin", app.html);
      } else {
        var e = document.getElementById(`taskbar-${app.name}-button`);
        e.parentNode.removeChild(e);
      }
    });
  }
}

exports.module = taskbarModule;
