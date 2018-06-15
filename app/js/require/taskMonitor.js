/* jshint node: true */
'use strict';
/* global
  $, document */

const EventEmitter = require('events').EventEmitter;
const {execSync} = require('child_process');
const path = require('path');
const AppProcess = require(path.resolve(__dirname, 'AppProcess.js')).AppProcess;

class TaskMonitor extends EventEmitter {
  constructor(refreshRate) {
    super();
    this.refreshRate = refreshRate;
    this.previouslyRunningApps = [];
  }

  get runningApps() {
    return this.getRunningApps();
  }

  getRunningApps() {
    var command = "osascript -e 'tell application \"System Events\" to name of every process whose background only is false'";
    var runningApps = [];

    execSync(command).toString().split(", ").forEach(app => {
      const appProcess = new AppProcess(app);
      runningApps.push(appProcess);
    });
    return runningApps;
  }

  setPreviouslyRunningApps(app) {
    this.previouslyRunningApps.push(app);
  }

  scanRunningApps() {
    const rA = this.runningApps;
    const pRA = this.previouslyRunningApps;

    rA.forEach(app => {
      var isAlreadyRunning;
      var previouslyRunningAppsMatch = pRA.map(prevApp => {
        return (app.name == prevApp.name);
      });

      //  Check for new apps
      if (previouslyRunningAppsMatch.includes(true)) {
        isAlreadyRunning = true;
      } else {
        this.emit("appEvent", app, true);
        this.previouslyRunningApps.push(app);
      }
    });

    pRA.forEach(app => {
      var isStillRunning;
      var runningAppsMatch = rA.map(prevApp => {
        return (app.name == prevApp.name);
      });

      //  Check for closed apps
      if (runningAppsMatch.includes(true)) {
        isStillRunning = true;
      } else {
        this.emit("appEvent", app, false);
        this.previouslyRunningApps.splice(this.previouslyRunningApps.indexOf(app),1);
      }
    });

  }

  start() {
    var _this = this;
    setInterval(function() {
      _this.scanRunningApps();
    }, this.refreshRate);
  }
}

exports.TaskMonitor = TaskMonitor;
