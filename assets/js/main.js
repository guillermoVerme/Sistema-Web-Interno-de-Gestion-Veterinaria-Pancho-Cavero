// Verificar sesión y la página actual
const usuarioSesion = localStorage.getItem('usuarioLogueado');
const esPaginaLogin = window.location.pathname.includes('login.html');

// Solo redirige al login si no hay sesión Y no estás ya en login.html
if (!usuarioSesion && !esPaginaLogin) {
    window.location.href = 'login.html';
}

// Manejo del botón de Cerrar Sesión
document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btnLogout');
    
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogueado');
            window.location.href = 'login.html';
        });
    }
});