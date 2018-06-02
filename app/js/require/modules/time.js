'use strict';

class timeModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  update() {
    var now = new Date();
    document.getElementById("time-output").innerHTML = dateFormat(now, "HH:MM");
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg pinned red" id="${moduleName}">
        <span class="output" id="${moduleName}-output"> ... </span>
        </div>
      </div>`
  }
}

exports.module = timeModule;
