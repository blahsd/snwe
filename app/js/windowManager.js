var openWindows = {};

function removeFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function isInArray(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}

function openPopWindow(windowpath) {
  if (openWindows[windowpath] != null) {
    openWindows[windowpath].close();
    return;
  }

  popWindow = new BrowserWindow({
     frame: false,
     transparent: true,
  });

  popWindow.loadURL('file://' + __dirname + '/' + windowpath);
  openWindows[windowpath] = popWindow;
  //popWindow.webContents.openDevTools();

  popWindow.webContents.on("changeTheme", function(e) {
    console.log("C-c-c-change!");
    loadSettings();
  })

  popWindow.webContents.on("close", function(e) {
    console.log("C-c-c-closing!");
    openWindows[windowpath] = null;
  })
}
