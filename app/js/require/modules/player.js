'use strict';

class playerModule extends externalModule {
  constructor(filePath,document,option=false) {
    super(filePath,document);
    this.container = 'left';

    try {
      var musicPlayerInterface = require(store.get('player')).musicPlayerInterface;
    } catch (e) {
      // Missing preference
      initializeSettings();
      var musicPlayerInterface = require(store.get('player')).musicPlayerInterface; 
    }
    this.mpi = new musicPlayerInterface();

  }

  update() {
    document.getElementById("player-output").innerHTML = this.mpi.track;

    if (this.mpi.playStatus) {
      document.getElementById("player-play-icon").classList.remove("fa-play");
      document.getElementById("player-play-icon").classList.add("fa-pause");
    } else {
      document.getElementById("player-play-icon").classList.remove("fa-pause");
      document.getElementById("player-play-icon").classList.add("fa-play");
    }
  }


  get HTMLContent() {
    var moduleName = this.fileName;

    return  `
    <div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-play-button">
        <i  class="fas fa-play" id="${moduleName}-play-icon"></i>
      </div>
      <div class="button" id="${moduleName}-next-button">
        <i  class="fas fa-step-forward" id="${moduleName}-next-icon"></i>
      </div>
      <span class="output" id="${moduleName}-output"> ... </span>
    </div>`

  }

  start () {
    document.getElementById("player-play-button").addEventListener("click", (e) => this.mpi.playpause());
    document.getElementById("player-next-button").addEventListener("click", (e) => this.mpi.next());

    var _this = this;
    setInterval(() => { _this.update()}, 1000)
  }

}

exports.module = playerModule;
