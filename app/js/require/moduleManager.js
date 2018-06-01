'use strict';

class moduleManager {
  constructor () {
    this.loadedModulesList = new Array();
    this.initializedModulesList = new Array();
    this.initializeModules();
  }

  initializeModules() {
    const fs = require('fs');
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);
    var modulesRelativePath = modulesFilename.map(x => '/modules/'+x)
    var modulesAbsolutePath = modulesRelativePath.map(x => path.join(__dirname, x))

    var modules = [];
    modulesAbsolutePath.forEach(moduleAbsolutePath => {
      var module = require(moduleAbsolutePath).module;
      var m = new module(moduleAbsolutePath,document);

      this.initializedModulesList.push(m);
    });

  }

  get availableModulesNames() {
    return this.fetchAvailableModulesNames();
  }

  get availableModulesFiles() {
    return this.fetchAvailableModulesFiles();
  }

  get fetchAvailableModulesFiles() {
    // Get a list of the files in ./modules
    const fs = require('fs');
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);
    var modulesRelativePath = modulesFilename.map(x => '/modules/'+x)
    var modulesAbsolutePath = modulesRelativePath.map(x => path.join(__dirname, x))

    return modulesAbsolutePath;
  }

  fetchAvailableModulesNames() {
    const fs = require('fs');
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);

    return modulesFilename;
  }

}

exports.moduleManager = moduleManager;
