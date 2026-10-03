async function procesarLogin(e) {
    e.preventDefault();

    const correo = document.getElementById('correoLogin').value.trim();
    const password = document.getElementById('passLogin').value.trim();

    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.pass === password);

    if (!usuarioEncontrado) {
        alert('Credenciales incorrectas. Verifica tu correo y contraseña.');
        return;
    }

    // CASO 1: Primer inicio de sesión (Clave Temporal)
    if (usuarioEncontrado.estado === 'Primer Ingreso') {
        document.getElementById('dniUsuarioCambio').value = usuarioEncontrado.correo;
        document.getElementById('modalCambioPassword').classList.add('active');
        return;
    }

    // CASO 2: Usuario Activo -> Ingreso Directo
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
    window.location.href = 'dashboard.html';
}

// Procesa el cambio obligatorio de contraseña en el primer inicio
function procesarCambioObligatorio(e) {
    e.preventDefault();

    const correoUsuario = document.getElementById('dniUsuarioCambio').value;
    const nuevaPass = document.getElementById('nuevaPass').value.trim();
    const confirmarPass = document.getElementById('confirmarPass').value.trim();

    if (nuevaPass !== confirmarPass) {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
    }

    if (nuevaPass.length < 6) {
        alert('La nueva contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // Actualizar usuario en localStorage: Nueva Clave y Estado "Activo"
    let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const index = usuarios.findIndex(u => u.correo === correoUsuario);

    if (index !== -1) {
        usuarios[index].pass = nuevaPass;
        usuarios[index].estado = 'Activo';
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarios[index]));
        alert('¡Contraseña actualizada con éxito! Redirigiendo al panel...');
        window.location.href = 'dashboard.html';
    }
}