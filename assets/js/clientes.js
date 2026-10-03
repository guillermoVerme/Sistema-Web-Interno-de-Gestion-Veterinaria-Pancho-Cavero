document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    cargarClientes();
});

let listaClientes = [
    { dni: '72819203', nombre: 'Carlos Mendoza Silva', telefono: '+51 987 654 321', correo: 'carlos.m@gmail.com', mascotas: ['Max (Perro)'] },
    { dni: '45102938', nombre: 'Lucía Fernández Pérez', telefono: '+51 912 345 678', correo: 'lucia.f@hotmail.com', mascotas: ['Rocky (Perro)', 'Michi (Gato)'] },
    { dni: '10928374', nombre: 'Sofía Ramírez Torres', telefono: '+51 955 112 233', correo: 'sofia.r@outlook.com', mascotas: ['Luna (Gato)'] }
];

function cargarClientes(filtro = '') {
    const tbody = document.getElementById('tablaClientesBody');
    if (!tbody) return;

    const clientesFiltrados = listaClientes.filter(c => 
        c.dni.includes(filtro) || 
        c.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        c.telefono.includes(filtro)
    );

    tbody.innerHTML = clientesFiltrados.map(c => `
        <tr>
            <td style="font-family: monospace; font-weight: 600; color: var(--text-muted);">${PE.esc(c.dni)}</td>
            <td style="font-weight: 600;">${PE.esc(c.nombre)}</td>
            <td>
                <div style="font-weight: 500;">${PE.esc(c.telefono)}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${PE.esc(c.correo)}</div>
            </td>
            <td>
                ${c.mascotas.map(m => `<span style="background-color: #e0e7ff; color: #3730a3; font-weight: 500; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; margin-right: 4px; display: inline-block; margin-bottom: 2px;">${PE.esc(m)}</span>`).join('')}
            </td>
            <td>
                <button onclick="eliminarCliente(${PE.esc(JSON.stringify(c.dni))})" style="background: none; border: none; cursor: pointer; color: var(--danger);"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
            </td>
        </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function filtrarClientes() {
    const texto = document.getElementById('buscarCliente').value;
    cargarClientes(texto);
}

function abrirModalCliente() {
    document.getElementById('modalCliente').classList.add('active');
}

function cerrarModalCliente() {
    document.getElementById('modalCliente').classList.remove('active');
    document.getElementById('formCliente').reset();
}

function guardarCliente(event) {
    event.preventDefault();
    const dni = document.getElementById('dniCliente').value;
    const nombre = document.getElementById('nombreCliente').value;
    const telefono = document.getElementById('telefonoCliente').value;
    const correo = document.getElementById('correoCliente').value;

    listaClientes.push({ dni, nombre, telefono, correo, mascotas: [] });

    cargarClientes();
    cerrarModalCliente();
}

function eliminarCliente(dni) {
    if (confirm("¿Desea eliminar a este cliente?")) {
        listaClientes = listaClientes.filter(c => c.dni !== dni);
        cargarClientes();
    }
}