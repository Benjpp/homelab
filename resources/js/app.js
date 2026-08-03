document.addEventListener('DOMContentLoaded', () => {
    // 1. Imprimir mensaje en la consola del navegador
    console.log('🚀 JS Vanilla cargado correctamente con Laravel Mix');

    // 2. Buscar el contenedor del HTML
    const appContainer = document.getElementById('app');

    if (appContainer) {
        // 3. Crear un nuevo elemento dinámicamente
        const statusText = document.createElement('p');
        statusText.style.color = '#10B981'; // Color verde
        statusText.style.fontWeight = 'bold';
        statusText.textContent = '✅ JavaScript Vanilla está activo y funcionando.';

        // 4. Insertar el elemento dentro del div #app
        appContainer.appendChild(statusText);
    }
});