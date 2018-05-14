'use strict';

class externalModule {
  constructor(filePath) {
    this.filePath = filePath;
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

  loadIn(document) {
    // Load the resource
    document.head.appendChild(this.fileRef);
    }

  injectHTMLIn(document, containerId) {
    //  Inject the HTML
      document.getElementById(containerId).insertAdjacentHTML("afterbegin", this.HTMLContent);
  }

}


exports.externalModule = externalModule;
