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

}

exports.module = dateModule;
