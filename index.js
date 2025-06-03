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
  mainWindow.loadFile('detail.html');
  mainWindow.webContents.openDevTools();

  ipcMain.on('load-page', (event, page) => {
    mainWindow.loadFile(page);
  })

  ipcMain.on('quit-app', () => {
    app.quit();
  });
})
