// Verificar si hay sesión activa
const usuarioSesion = localStorage.getItem('usuarioLogueado');
if (!usuarioSesion) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMascotas();
});

async function cargarMascotas() {
    try {
        const response = await fetch('http://localhost:3000/api/mascotas');
        const mascotas = await response.json();

        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        mascotas.forEach(mascota => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${mascota.codigo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.especie_raza}</td>
                <td>${mascota.edad}</td>
                <td>${mascota.propietario}</td>
                <td>
                    <button class="btn btn-outline btn-sm">Ficha Médica</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
    }
}