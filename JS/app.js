// Esperar a que la página cargue completamente
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('main-content').classList.add('visible');
  }, 3000); // 3 segundos
});


