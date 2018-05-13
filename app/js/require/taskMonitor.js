const appProcess = require('./appProcess.js').appProcess;
const EventEmitter = require('events').EventEmitter;

class taskMonitor extends EventEmitter {
  constructor(refreshRate) {
    super();
    this.refreshRate = refreshRate;
  }

  get runningApps() {
    return this.getRunningApps();
  }

  getRunningApps() {
    var command = "osascript -e 'tell application \"System Events\" to name of every process whose background only is false'";
    var runningApps = [];

    execSync(command).toString().split(", ").forEach(app => {
      const ap = new appProcess(app);
      runningApps.push(ap);
    })
    return runningApps;
  }

  changeTask() {
    // STARTPOINT
    // we check if the tasks are changed. if they are, we emit the event.
    this.emit("taskChange");
  }

  start() {
    var _this = this;
    // call this.changeTask() using our new created variable.
    // this has to be done as this would normally call something
    // inside this function, so we have to pass it as own
    // variable over
    setInterval(function() {
      _this.changeTask();
    }, this.refreshRate);
  }
}

exports.taskMonitor = taskMonitor;
