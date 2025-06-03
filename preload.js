const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadPage: (page) => ipcRenderer.send('load-page', page),
  quitApp: () => ipcRenderer.send('quit-app')
});
