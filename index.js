const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.setResizable(false);
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();

  ipcMain.on('load-detail-page', () => {
    console.log('test')
    mainWindow.loadFile('detail.html');
  })

  ipcMain.on('quit-app', () => {
    app.quit();
  });
})

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
// });

// function createMainWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//       nodeIntegration: false,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   mainWindow.setResizable(false);
//   mainWindow.loadFile('index.html');

//   mainWindow.webContents.openDevTools();

//   // mainWindow.on('closed', () => {
//   //   mainWindow = null;
//   // });
// }

// app.whenReady().then(() => {
//   createMainWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// app.whenReady().then(() => {
//   createMainWindow()
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
// });