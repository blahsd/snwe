'use strict';

class launcherItem {
  constructor(display, command) {
    this.display = display
    this.command = `open $HOME/Library/"Application\ Support"/snwe/command-wrappers/${command}.command`
    this.makeCommandLauncher(command)
  }

  get node() {
    var n = document.createElement("div")
    n.innerHTML = this.HTMLContent

    var _this = this
    n.onclick = function() {
      execSync(_this.command)
    }

    return n
  }

  get HTMLContent() {
    return `<div class="button" id="${this.display}">
    ${this.display}
      </div>`
  }

  makeCommandLauncher(command) {
    var scriptMakeCommand = path.join(__dirname, "../../../sh/launcher/makeCommand.sh");
    exec(`sh ${scriptMakeCommand} ${ command }`)
  }
}

class launcherModule extends externalModule {
  constructor(filePath, document) {
    super(filePath, document);
    this.container = 'left';
    this.commands = {
      'rng': 'ranger',
      'htop': 'htop'
    }
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return `<div class="widg" id="${moduleName}">
      </div>`
  }

  start() {
    // Create icons for all the apps in the list
    // Create listeners for all the icons created
    $.each(this.commands, function(key, value) {
      var li = new launcherItem(key, value)
      $("#launcher").append(li.node)
    })
  }
}

exports.module = launcherModule;
