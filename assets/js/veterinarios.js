document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    cargarVeterinarios();
});

let listaVeterinarios = [
    { cmvp: 'CMVP-10452', nombre: 'Dr. Alejandro Morales', especialidad: 'Cirugía', telefono: '+51 987 111 222', correo: 'amorales@petexperts.com', estado: 'Activo' },
    { cmvp: 'CMVP-08912', nombre: 'Dra. Vanessa Rivas', especialidad: 'Dermatología', telefono: '+51 922 333 444', correo: 'vrivas@petexperts.com', estado: 'Activo' },
    { cmvp: 'CMVP-12004', nombre: 'Dr. Gonzalo Salazar', especialidad: 'Medicina General', telefono: '+51 955 666 777', correo: 'gsalazar@petexperts.com', estado: 'Activo' }
];

function cargarVeterinarios(filtro = '') {
    const tbody = document.getElementById('tablaVeterinariosBody');
    if (!tbody) return;

    const veterinariosFiltrados = listaVeterinarios.filter(v => 
        v.cmvp.toLowerCase().includes(filtro.toLowerCase()) || 
        v.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        v.especialidad.toLowerCase().includes(filtro.toLowerCase())
    );

    tbody.innerHTML = veterinariosFiltrados.map(v => `
        <tr>
            <td style="font-family: monospace; font-weight: 600; color: var(--text-muted);">${v.cmvp}</td>
            <td style="font-weight: 600;">${v.nombre}</td>
            <td>
                <span style="background-color: #e0e7ff; color: #3730a3; font-weight: 500; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">
                    ${v.especialidad}
                </span>
            </td>
            <td>
                <div style="font-weight: 500;">${v.telefono}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${v.correo}</div>
            </td>
            <td>
                <span style="background-color: #d1fae5; color: #065f46; font-weight: 500; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">
                    ${v.estado}
                </span>
            </td>
            <td>
                <button onclick="eliminarVeterinario('${v.cmvp}')" style="background: none; border: none; cursor: pointer; color: var(--danger);"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
            </td>
        </tr>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function filtrarVeterinarios() {
    const texto = document.getElementById('buscarVeterinario').value;
    cargarVeterinarios(texto);
}

function abrirModalVeterinario() {
    document.getElementById('modalVeterinario').classList.add('active');
}

function cerrarModalVeterinario() {
    document.getElementById('modalVeterinario').classList.remove('active');
    document.getElementById('formVeterinario').reset();
}

function guardarVeterinario(event) {
    event.preventDefault();
    const cmvp = `CMVP-${document.getElementById('cmvpVet').value}`;
    const nombre = document.getElementById('nombreVet').value;
    const especialidad = document.getElementById('especialidadVet').value;
    const telefono = document.getElementById('telefonoVet').value;
    const correo = document.getElementById('correoVet').value;

    listaVeterinarios.push({ cmvp, nombre, especialidad, telefono, correo, estado: 'Activo' });

    cargarVeterinarios();
    cerrarModalVeterinario();
}

function eliminarVeterinario(cmvp) {
    if (confirm(`¿Desea dar de baja al especialista con registro ${cmvp}?`)) {
        listaVeterinarios = listaVeterinarios.filter(v => v.cmvp !== cmvp);
        cargarVeterinarios();
    }
}