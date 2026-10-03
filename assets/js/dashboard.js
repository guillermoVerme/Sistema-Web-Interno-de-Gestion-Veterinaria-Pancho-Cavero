// Verificar si hay sesión activa
const usuarioSesion = localStorage.getItem('usuarioLogueado');
if (!usuarioSesion) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    cargarEstadisticas();
    cargarProximasCitas();
});

async function cargarEstadisticas() {
    try {
        const response = await fetch('http://localhost:3000/api/dashboard/stats');
        const data = await response.json();

        const stats = document.querySelectorAll('.kpi-value');
        if (stats.length >= 4) {
            stats[0].textContent = data.citasHoy;
            stats[1].textContent = data.pacientesAtendidos;
            stats[2].textContent = data.mascotasRegistradas;
            stats[3].textContent = data.alertasStock;
        }
    } catch (error) {
        console.error('Error al cargar métricas:', error);
    }
}

async function cargarProximasCitas() {
    try {
        const response = await fetch('http://localhost:3000/api/citas');
        const citas = await response.json();

        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;

        tbody.innerHTML = ''; // Limpiar filas de prueba estatícas

        citas.slice(0, 5).forEach(cita => {
            const badgeClass = cita.estado.toLowerCase().replace(/[^a-z]/g, '');
            const fila = `
                <tr>
                    <td>${PE.esc(cita.hora_formateada)}</td>
                    <td>${PE.esc(cita.mascota)} (${PE.esc(cita.raza)})</td>
                    <td>${PE.esc(cita.propietario)}</td>
                    <td>${PE.esc(cita.veterinario)}</td>
                    <td><span class="badge badge-${badgeClass}">${PE.esc(cita.estado)}</span></td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });
    } catch (error) {
        console.error('Error al cargar tabla de citas:', error);
    }
}