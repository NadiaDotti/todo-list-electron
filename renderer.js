document.getElementById('start').addEventListener('click', () => {
  window.electronAPI.loadPage('detail.html');
});

document.getElementById('quit').addEventListener('click', () => {
  window.electronAPI.quitApp();
});
