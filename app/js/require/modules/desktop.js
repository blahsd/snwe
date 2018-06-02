'use strict';

class desktopModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'left';
  }

  update() {
    var dir = exec("echo $(/usr/local/bin/chunkc tiling::query -d id)", function(err, stdout, stderr) {
      document.getElementById("desktop-output").classList.remove("fab");
      document.getElementById("desktop-output").classList.remove("fa-apple");

      if (stderr) {
        document.getElementById("desktop-output").classList.add("fab");
        document.getElementById("desktop-output").classList.add("fa-apple");
        document.getElementById("desktop-output").innerHTML = "";
      } else {
        document.getElementById("desktop-output").innerHTML = stdout;
      }
    });
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg pinned green" id="${moduleName}">
        <span class="output" id="${moduleName}-output"> ... </span>
        </div>
      </div>`
  }
}

exports.module = desktopModule;
