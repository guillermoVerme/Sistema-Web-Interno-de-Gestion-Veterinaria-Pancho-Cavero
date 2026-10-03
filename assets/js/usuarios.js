document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('usuariosRegistrados')) {
        const usuariosIniciales = [
            { dni: '72839401', nombre: 'Guillermo Manrique', correo: 'admin@petexperts.com', rol: 'Administrador', pass: 'admin123', estado: 'Activo' },
            { dni: '45123987', nombre: 'Dra. Valeria Torres', correo: 'vtorres@petexperts.com', rol: 'Veterinario', pass: 'vt2026*', estado: 'Activo' },
            { dni: '10982345', nombre: 'Carlos Ramírez', correo: 'cramirez@petexperts.com', rol: 'Recepcionista', pass: 'temp123', estado: 'Primer Ingreso' }
        ];
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosIniciales));
    }
    renderizarTablaUsuarios();
});

// Renderizar tabla con ícono de papelera y acción de eliminación
function renderizarTablaUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const tbody = document.getElementById('tablaUsuariosBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    usuarios.forEach(user => {
        const badgeClass = user.estado === 'Activo' ? 'badge-success' : 'badge-warning';
        const row = `
            <tr>
                <td><strong>${user.dni}</strong></td>
                <td>${user.nombre}</td>
                <td>${user.correo}</td>
                <td>${user.rol}</td>
                <td><span class="badge ${badgeClass}">${user.estado}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-icon edit" title="Editar Usuario" onclick="prepararEdicion('${user.dni}')">
                            <i data-lucide="pencil" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon delete" title="Eliminar Usuario" onclick="eliminarUsuario('${user.dni}')">
                            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    if (window.lucide) lucide.createIcons();
}

// Función para eliminar usuario de localStorage
function eliminarUsuario(dni) {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuario = usuarios.find(u => u.dni === dni);

    if (!usuario) return;

    // Alerta de confirmación
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario "${usuario.nombre}"?`);
    
    if (confirmacion) {
        const usuariosFiltrados = usuarios.filter(u => u.dni !== dni);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosFiltrados));
        renderizarTablaUsuarios();
    }
}
function abrirModalNuevoUsuario() {
    // 1. Desactivar modo edición
    modoEdicion = false;

    // 2. Cambiar título y texto del botón
    document.getElementById('modalTitulo').innerText = 'Nuevo Usuario';
    document.getElementById('btnGuardarModal').innerText = 'Guardar Usuario';

    // 3. Limpiar todos los campos del formulario
    document.getElementById('formUsuario').reset();

    // 4. HABILITAR el DNI (para que se pueda escribir)
    const inputDni = document.getElementById('inputDni');
    inputDni.disabled = false;
    inputDni.value = '';

    // 5. MOSTRAR la contraseña temporal
    const grupoPassword = document.getElementById('grupoPassword');
    if (grupoPassword) {
        grupoPassword.style.display = 'block';
    }

    // 6. Generar una nueva clave temporal
    generarPasswordTemporal();

    // 7. Desplegar el modal
    document.getElementById('modalUsuario').style.display = 'flex';
}

let modoEdicion = false;

// Función para abrir modal en blanco (+ Nuevo Usuario)
function abrirModalNuevoUsuario() {
    modoEdicion = false;
    
    const modal = document.getElementById('modalUsuario');
    if (!modal) return alert('No se encontró el elemento modalUsuario en el HTML.');

    document.getElementById('modalTitulo').innerText = 'Nuevo Usuario';
    document.getElementById('btnGuardarModal').innerText = 'Guardar Usuario';
    document.getElementById('formUsuario').reset();

    // Habilitar DNI y mostrar grupo de contraseña
    const inputDni = document.getElementById('inputDni');
    inputDni.disabled = false;
    
    const grupoPassword = document.getElementById('grupoPassword');
    if (grupoPassword) grupoPassword.style.display = 'block';

    generarPasswordTemporal();

    modal.style.display = 'flex';
}

// Generar clave aleatoria
function generarPasswordTemporal() {
    const pass = 'Pet' + Math.floor(1000 + Math.random() * 9000) + '*';
    const inputPass = document.getElementById('inputPassword');
    if (inputPass) inputPass.value = pass;
}

// Cerrar ventana
function cerrarModal() {
    const modal = document.getElementById('modalUsuario');
    if (modal) modal.style.display = 'none';
}

function eliminarUsuario(dni) {
    // 1. Normalizar DNI recibido a texto sin espacios
    const dniBuscado = String(dni).trim();
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    // 2. Buscar usuario comparando ambos DNI como String
    const usuarioAEliminar = usuarios.find(u => String(u.dni).trim() === dniBuscado);

    if (!usuarioAEliminar) return;

    // 3. Normalizar el rol para evitar fallos por mayúsculas o espacios ("Administrador" vs "administrador")
    const rolUsuario = (usuarioAEliminar.rol || '').toLowerCase().trim();
    const adminsActivos = usuarios.filter(u => (u.rol || '').toLowerCase().trim() === 'administrador');

    // REGLA 1: No permitir eliminar si es el único Administrador existente
    if (rolUsuario === 'administrador' && adminsActivos.length <= 1) {
        alert('🚫 Acción Bloqueada: No puedes eliminar este usuario porque es el único Administrador registrado en el sistema.');
        return;
    }

    // REGLA 2: No permitir eliminar la cuenta actualmente en uso
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion')) || {};
    if (usuarioSesion.dni && String(usuarioSesion.dni).trim() === dniBuscado) {
        alert('🚫 Acción Bloqueada: No puedes eliminar tu propia cuenta mientras mantienes la sesión activa.');
        return;
    }

    // Confirmación final si pasa todas las reglas de seguridad
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario "${usuarioAEliminar.nombre}"?`);
    
    if (confirmacion) {
        const usuariosFiltrados = usuarios.filter(u => String(u.dni).trim() !== dniBuscado);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosFiltrados));
        renderizarTablaUsuarios();
    }

}