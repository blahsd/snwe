/* jshint node: true */
'use strict';

/* global
$, document, require, exports, __dirname */

const path = require('path');
const fs = require('fs');

class ModuleManager {
  initializeModules() {
    this.loadedModulesList = [];
    this.initializedModulesList = [];
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);
    var modulesRelativePath = modulesFilename.map(x => '/modules/'+x);
    var modulesAbsolutePath = modulesRelativePath.map(x => path.join(__dirname, x));
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
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);
    var modulesRelativePath = modulesFilename.map(x => '/modules/'+x);
    var modulesAbsolutePath = modulesRelativePath.map(x => path.join(__dirname, x));

    return modulesAbsolutePath;
  }

  fetchAvailableModulesNames() {
    const moduleFolderRelativePath = '/modules';
    const moduleFolderAbsolutePath = path.join(__dirname, moduleFolderRelativePath);
    var modulesFilename = fs.readdirSync(moduleFolderAbsolutePath);

    return modulesFilename;
  }

  updateChangedModule(moduleName, enabled) {
    // Loads or unloads a module at runtime
    this.initializedModulesList.forEach(module => {
      if (module.fileName == moduleName) {
        if (enabled) {
          module.loadIn();
          module.injectHTMLIn();
        } else {
          module.unload();
        }
      }
    });
  }

  loadModules(modulesToLoad) {
    modulesToLoad.forEach(module => {
      if (module.enabled) {
        this.initializedModulesList.forEach(initializedModule => {
          if (module.filename == initializedModule.fileName) {
            initializedModule.loadIn();
            initializedModule.injectHTMLIn();
            initializedModule.start();
          }
        });
      }
    });
  }

}

exports.ModuleManager = ModuleManager;
