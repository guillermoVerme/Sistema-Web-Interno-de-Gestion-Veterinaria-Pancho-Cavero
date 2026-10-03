document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    cargarCitas();
});

let listaCitas = [
    { hora: '09:00 AM', mascota: 'Bruno (Caniche)', propietario: 'Carlos Gómez', motivo: 'Desparasitación', veterinario: 'Dr. Ramírez', estado: 'Confirmada' },
    { hora: '10:30 AM', mascota: 'Luna (Persa)', propietario: 'María López', motivo: 'Consulta General', veterinario: 'Dra. Torres', estado: 'En curso' },
    { hora: '11:00 AM', mascota: 'Max (Siberiano)', propietario: 'Ana Paredes', motivo: 'Revisión General', veterinario: 'Dr. Ramírez', estado: 'Confirmada' },
    { hora: '11:45 AM', mascota: 'Michi (Siamés)', propietario: 'Luis Vega', motivo: 'Vacunación', veterinario: 'Dra. Torres', estado: 'Pendiente' }
];

function obtenerBadgeEstado(estado) {
    switch (estado) {
        case 'Confirmada':
            return '<span style="background-color: #d1fae5; color: #065f46; font-weight: 600; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">Confirmada</span>';
        case 'En curso':
            return '<span style="background-color: #e0e7ff; color: #3730a3; font-weight: 600; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">En curso</span>';
        case 'Pendiente':
            return '<span style="background-color: #fef3c7; color: #92400e; font-weight: 600; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">Pendiente</span>';
        default:
            return `<span style="background-color: #f1f5f9; color: #475569; font-weight: 600; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">${estado}</span>`;
    }
}

function cargarCitas() {
    const tbody = document.getElementById('tablaCitasBody');
    if (!tbody) return;

    const texto = document.getElementById('buscarCita')?.value.toLowerCase() || '';
    const vetFiltro = document.getElementById('filtroVeterinario')?.value || '';
    const estadoFiltro = document.getElementById('filtroEstado')?.value || '';

    const citasFiltradas = listaCitas.filter(c => {
        const coincideTexto = c.mascota.toLowerCase().includes(texto) || c.propietario.toLowerCase().includes(texto) || c.motivo.toLowerCase().includes(texto);
        const coincideVet = vetFiltro === '' || c.veterinario === vetFiltro;
        const coincideEstado = estadoFiltro === '' || c.estado === estadoFiltro;
        return coincideTexto && coincideVet && coincideEstado;
    });

    tbody.innerHTML = citasFiltradas.map((c, idx) => `
        <tr>
            <td style="font-weight: 600; color: var(--primary);">${c.hora}</td>
            <td style="font-weight: 600;">${c.mascota}</td>
            <td>${c.propietario}</td>
            <td>${c.motivo}</td>
            <td>${c.veterinario}</td>
            <td>${obtenerBadgeEstado(c.estado)}</td>
            <td>
                <button onclick="eliminarCita(${idx})" style="background: none; border: none; cursor: pointer; color: var(--danger);"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
            </td>
        </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function filtrarCitas() {
    cargarCitas();
}

function abrirModalCita() {
    document.getElementById('modalCita').classList.add('active');
}

function cerrarModalCita() {
    document.getElementById('modalCita').classList.remove('active');
    document.getElementById('formCita').reset();
}

function guardarCita(event) {
    event.preventDefault();
    const mascota = document.getElementById('mascotaCita').value;
    const propietario = document.getElementById('propietarioCita').value;
    const hora = document.getElementById('horaCita').value || '12:00 PM';
    const veterinario = document.getElementById('vetCita').value;
    const motivo = document.getElementById('motivoCita').value;

    listaCitas.push({ hora, mascota, propietario, motivo, veterinario, estado: 'Pendiente' });

    cargarCitas();
    cerrarModalCita();
}

function eliminarCita(index) {
    if (confirm("¿Desea cancelar y eliminar esta cita?")) {
        listaCitas.splice(index, 1);
        cargarCitas();
    }
}