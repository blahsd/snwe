class chunkwmModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';

    this.scriptGetCharge = path.join(__dirname, "../../../sh/getcharge.sh");
    this.scriptIsCharging = path.join(__dirname, "../../../sh/ischarging.sh");
  }


  start() {
    this.update();
  }
}

exports.module = chunkwmModule;
