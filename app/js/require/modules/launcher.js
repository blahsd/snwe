'use strict';

/* global
$, document, require, exports, console, __dirname */

const {exec} = require('child_process');
const path = require('path');
const ExternalModule = require( path.resolve('./app/js/require/ExternalModule.js')).ExternalModule;

class launcherItem {
  constructor(display, command) {
    this.display = display;
    this.command = `open $HOME/Library/"Application\ Support"/snwe/command-wrappers/${command}.command`;
    this.makeCommandLauncher(command);
  }

  get node() {
    var n = document.createElement("div");
    n.innerHTML = this.HTMLContent;

    var _this = this;
    n.onclick = function() {
      let cp = exec(_this.command, (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        console.log(`${stdout}`);
      });
    };
    return n;
  }

  get HTMLContent() {
    return `<div class="button" id="${this.display}">
    ${this.display}
      </div>`;
  }

  makeCommandLauncher(command) {
    var scriptMakeCommand = path.join(__dirname, "../../../sh/launcher/makeCommand.sh");
    exec(`sh ${scriptMakeCommand} ${ command }`);
  }
}

class launcherModule extends ExternalModule {
  constructor(filePath, document) {
    super(filePath, document);
    this.container = 'left';
    this.commands = {
      'rng': 'ranger',
      'htop': 'htop'
    };
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return `<div class="widg" id="${moduleName}">
      </div>`;
  }

  start() {
    // Create icons for all the apps in the list
    // Create listeners for all the icons created
    $.each(this.commands, function(key, value) {
      var li = new launcherItem(key, value);
      $("#launcher").append(li.node);
    });
  }
}

exports.module = launcherModule;
