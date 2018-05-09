var openWindows = {};

function createChildWindow(windowpath, parent) {
  if (openWindows[windowpath] != null) {
    openWindows[windowpath].close();
    return;
  }

  // TO DO: Figure out the position of parent and get the window to spawn right below it.

  childWindow = new BrowserWindow({
     frame: false,
     transparent: true,
  });

  childWindow.loadURL('file://' + __dirname + '/' + windowpath);
  openWindows[windowpath] = childWindow;
  //childWindow.webContents.openDevTools();

  childWindow.webContents.on("changeSettingEvent", function(e) {
    console.log("C-c-c-change!");
    loadSettings();
  })

  childWindow.webContents.on("close", function(e) {
    console.log("C-c-c-closing!");
    openWindows[windowpath] = null;
  })
}
