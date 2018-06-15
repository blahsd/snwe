/* jshint node: true */
'use strict';

/* global
  $, require, exports, __dirname, setInterval */

const path = require('path');
const {exec} = require('child_process');
const ExternalModule = require( path.resolve(__dirname, '../ExternalModule.js')).ExternalModule;

class chunkwmModule extends ExternalModule {
  constructor(filePath,document) {
    super(filePath,document);
    this.container = 'right';
  }

  setChunkwmMode(mode) {
    let command = `chunkc tiling::desktop --layout ${mode}`;
    console.log(`Running command: '${command}'`);
    exec(command);
  }

  get HTMLContent() {
    return  `
    <div class="widg" id="${this.fileName}">
      <div class="button" id="${this.fileName}-button">
        <i class="far fa-window-restore" id="${this.fileName}-icon"></i>
        <span id="${this.fileName}-output"></span>
      </div>

      <div class="popup" id="${this.fileName}-popup">
        <div class="button mode-button" value="bsp" id="bsp-chunkwm-button">
          bsp
        </div>
        <div class="button mode-button" value="monocle" id="monocle-chunkwm-button">
          mono
        </div>
        <div class="button mode-button" value="float" id="float-chunkwm-button">
          float
        </div>
      </div>
    </div>`;
  }

  start() {
    $(`#${this.fileName}-button`).on("click", () => {
      $(`#${this.fileName}-popup`).toggleClass("open");
    });

    $(".mode-button").on("click", function() {
       exec(`chunkc tiling::desktop --layout ${ this.getAttribute("value") }`);
    })

    /*
    $(`#bsp-${this.fileName}-button`).on("click", () => {
      this.setChunkwmMode('bsp');
    });
    $(`#monocle-${this.fileName}-button`).on("click", () => {
      this.setChunkwmMode('monocle');
    });
    $(`#float-${this.fileName}-button`).on("click", () => {
      this.setChunkwmMode('float');
    });
    */
  }
}

exports.module = chunkwmModule;
