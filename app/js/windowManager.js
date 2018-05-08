const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const remove = require('electron').remote;

function openPopWindow( windowpath ) {
  const popWindow = new BrowserWindow({

     frame: false,
     transparent: true
  });

  popWindow.loadURL('file://' + __dirname + '/' + windowpath);
  //popWindow.webContents.openDevTools();

  popWindow.webContents.on("changeTheme", function(e) {
    console.log("C-c-c-change!")
    loadPreferences();
  })
}
