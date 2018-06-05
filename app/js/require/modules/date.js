'use strict';

class dateModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'middle';
    this.refreshRate = 60000;
  }

  update() {
    var now = new Date();
    var date = dateFormat(now, "ddd d mmm")
    this.updateContent($("#date-output"), date)
  }

}

exports.module = dateModule;
