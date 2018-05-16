'use strict';

class dateModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'middle';
  }

  update() {
    var now = new Date();
    document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" id="${moduleName}">
        <span class="output" id="${moduleName}-output"> ... </span>
        </div>
      </div>`
  }
}

exports.module = dateModule;
