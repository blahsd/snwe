/* jshint node: true */
'use strict';

/* global
  utils, $, document, console, __dirname */

const {exec} = require('child_process');
const path = require('path');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;


class launcherItem {
  constructor(commandName, commandContent) {
    this.commandName = commandName;
    this.commandContent = commandContent;

    this.command = `open $HOME/Library/"Application\ Support"/snwe/command-wrappers/${commandName}.command`;

    this.makeCommandLauncher(commandName, commandContent);
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
    return `<div class="button" id="${this.commandName}">
    ${this.commandName}
      </div>`;
  }

  makeCommandLauncher(commandName,commandContent) {
    var scriptMakeCommandPath = path.resolve("./app/sh/makeCommand.sh");
    console.log(commandContent)
    exec(`sh ${scriptMakeCommandPath} ${commandName} '${commandContent}'`);
  }
}

class launcherModule extends ExternalModule {
  constructor(filePath, document) {
    super(filePath, document);
    this.container = 'left';
  }
  get commands() {
    return utils.store.get("commands");
    //return {'bsd':"jsadiasjdi bs", "daosjd":"ashdasd"}
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
