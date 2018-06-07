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
    this.isLoaded = false;
    this.node = document.createElement("div");
    this.node.innerHTML = this.HTMLContent;
  }

  /*
  updateContent(elementId, content) {
    if (document.getElementById(elementId).innerHTML != content) {
      document.getElementById(elementId).innerHTML = content;
    }
  } */

  updateContent(element, content) {
    if (element.html() != content) {
      element.html(content)
    }
  }

  updateElementProperty(element, property, propertyList) {
    if (!element.hasClass(property)) {
      propertyList.forEach(p => {
        element.removeClass(p)
      })
      if (property) {
        element.addClass(property)
      }
    }
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
    console.log(`Loading module '${this.fileNameAndExtension}'`)
    document.head.appendChild(this.fileRef);
    this.isLoaded = true;
  }

  injectHTMLIn() {
    document.getElementById(this.container).appendChild(this.node);
  }

  update() {
    //  This must be overwritten by extensors
  }

  start() {
    var _this = this;
    this.update();
    this.intervalID = setInterval(() => { _this.update()}, this.refreshRate);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  unload() {
    this.stop();
    this.node.remove();
    this.isLoaded = false;
  }

}

exports.externalModule = externalModule;
