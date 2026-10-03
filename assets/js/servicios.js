document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    cargarServicios();
});

let listaServicios = [
    { codigo: 'SERV-001', nombre: 'Consulta Médica General', categoria: 'Consultas', precio: '60.00', estado: 'Activo' },
    { codigo: 'SERV-002', nombre: 'Vacuna Quinta/Sextuple Canina', categoria: 'Vacunación', precio: '85.00', estado: 'Activo' },
    { codigo: 'SERV-003', nombre: 'Profilaxis Dental Veterinaria', categoria: 'Cirugía', precio: '180.00', estado: 'Activo' },
    { codigo: 'SERV-004', nombre: 'Baño y Corte Estético', categoria: 'Estética', precio: '50.00', estado: 'Activo' }
];

function cargarServicios() {
    const tbody = document.getElementById('tablaServiciosBody');
    if (!tbody) return;

    tbody.innerHTML = listaServicios.map(s => `
        <tr>
            <td style="font-family: monospace; font-weight: 600; color: var(--text-muted);">${s.codigo}</td>
            <td style="font-weight: 600;">${s.nombre}</td>
            <td>${s.categoria}</td>
            <td>S/ ${parseFloat(s.precio).toFixed(2)}</td>
            <td><span class="badge ${s.estado === 'Activo' ? 'badge-confirmada' : 'badge-cancelada'}">${s.estado}</span></td>
            <td>
                <button onclick="eliminarServicio('${s.codigo}')" style="background: none; border: none; cursor: pointer; color: var(--danger);"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
            </td>
        </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function abrirModalServicio() {
    document.getElementById('modalServicio').classList.add('active');
}

function cerrarModalServicio() {
    document.getElementById('modalServicio').classList.remove('active');
    document.getElementById('formServicio').reset();
}

function guardarServicio(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreServicio').value;
    const categoria = document.getElementById('categoriaServicio').value;
    const precio = document.getElementById('precioServicio').value;

    const nuevoCodigo = `SERV-00${listaServicios.length + 1}`;
    listaServicios.push({ codigo: nuevoCodigo, nombre, categoria, precio, estado: 'Activo' });

    cargarServicios();
    cerrarModalServicio();
}

function eliminarServicio(codigo) {
    listaServicios = listaServicios.filter(s => s.codigo !== codigo);
    cargarServicios();
}