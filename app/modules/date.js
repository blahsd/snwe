'use strict';

class dateModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'middle';
  }

  update() {
    var now = new Date();
    this.document.getElementById("date-output").innerHTML = dateFormat(now, "ddd d mmm");
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" onmouseover="alert('hasd')" id="${moduleName}">
        <div class="button" id="${moduleName}-button">
          <i id="${moduleName}-icon"></i>
        </div>
        <span class="output" id="${moduleName}-output"> ... </span>
        <div class="popup" id="${moduleName}-popup">
        </div>
      </div>`
  }
}

exports.module = dateModule;
