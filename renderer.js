document.getElementById('start').addEventListener('click', () => {
  window.electronAPI.loadDetailPage();
});

document.getElementById('quit').addEventListener('click', () => {
  window.electronAPI.quitApp();
});
