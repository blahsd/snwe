'use strict';

class settingsModule extends externalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  update() {
    //
  }

  start() {
    //
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `
    <div class="widg" id="${moduleName}">
      <div class="button" id="${moduleName}-button" onclick="createSettingsWindow();">
        <i class="fas fa-cog" id="settings-icon"></i>
        <span id="settings-output"></span>
      </div>
    </div>`
  }
}

exports.module = settingsModule;
