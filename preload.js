const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadDetailPage: () => ipcRenderer.send('load-detail-page'),
  quitApp: () => ipcRenderer.send('quit-app')
});
