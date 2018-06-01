'use strict';

const EventEmitter = require('events').EventEmitter;

class externalModule extends EventEmitter {
  constructor(filePath,unID=false) {
    super();
    this.filePath = filePath;
    this.document = document;
    this.container = 'right';
    this.refreshRate = 1000;
    this.unID = unID;
  }

  get fileName() {
    return this.filePath.substring(
      this.filePath.lastIndexOf('/') + 1, this.filePath.lastIndexOf('.')
    );
  }

  get fileNameAndExtension() {
    return this.filePath.substring(this.filePath.lastIndexOf('/') + 1, this.filePath.length);
  }

  get fileType() {
    return this.filePath.substring(
      this.filePath.lastIndexOf('.') +1, this.filePath.length
    );
  }

  get fileRef() {
    if (this.fileType == "js"){ //if filename is a external JavaScript file
      var fileRef = document.createElement('script');
      fileRef.setAttribute("type","text/javascript");
      fileRef.setAttribute("src", this.filePath);
    }
    else if (this.fileType == "css"){ //if filename is an external CSS file
      var fileRef = document.createElement("link");
      fileRef.setAttribute("rel", "stylesheet");
      fileRef.setAttribute("type", "text/css");
      fileRef.setAttribute("href", this.filePath);
    }
    fileRef.setAttribute("id",this.unID)

    return fileRef;
  }

  get HTMLContent() {
    var moduleName = this.fileName;
    return  `<div class="widg" id="${moduleName}">
        <div class="button" id="${moduleName}-button">
          <i id="${moduleName}-icon"></i>
        </div>
        <span class="output" id="${moduleName}-output"> ... </span>
        <div class="popup" id="${moduleName}-popup">
        </div>
      </div>`
  }

  loadIn() {
    // Load the resource
    this.document.head.appendChild(this.fileRef);

    }

  injectHTMLIn() {
    //  Inject the HTML
    var position;
    if (this.container == 'left') {
      position = 'beforeend';
    } else if (this.container == 'right') {
      position = 'afterbegin';
    } else {
      position = 'afterbegin';
    }

    this.document.getElementById(this.container).insertAdjacentHTML(position, this.HTMLContent);
  }

  update() {
    //  This must be overwritten by extensors
  }

  start() {
    var _this = this;
    setInterval(() => { _this.update()}, 1000)
  }

}

exports.externalModule = externalModule;
