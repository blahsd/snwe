'use strict';

class timeModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document)
    this.container = 'right'
    this.refreshRate = 60000
  }

  update() {
    var now = new Date()
    var date = dateFormat(now, "HH:MM")

    this.updateContent($("#time-output"), date)
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
