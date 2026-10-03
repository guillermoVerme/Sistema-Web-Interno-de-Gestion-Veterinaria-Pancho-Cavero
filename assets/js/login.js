/* login.js – inicio de sesión (modo demostración). Requiere core.js */
async function procesarLogin(e) {
  e.preventDefault();
  const correo = document.getElementById('correoLogin').value.trim().toLowerCase();
  const hash = await PE.sha256(document.getElementById('passLogin').value);

  const usuarios = JSON.parse(localStorage.getItem(PE.USERS_KEY)) || [];
  const u = usuarios.find((x) => x.correo.toLowerCase() === correo && x.passHash === hash);

  if (!u) return alert('Credenciales incorrectas. Verifica tu correo y contraseña.');
  if (u.estado === 'Inactivo') return alert('Tu cuenta está desactivada. Contacta al administrador.');

  if (u.estado === 'Primer Ingreso') { // cambio obligatorio de contraseña
    document.getElementById('dniUsuarioCambio').value = u.correo;
    document.getElementById('modalCambioPassword').classList.add('active');
    return;
  }
  iniciarSesion(u);
}

function iniciarSesion(u) {
  // La sesión nunca guarda la contraseña ni su hash
  localStorage.setItem(PE.SESSION_KEY, JSON.stringify({ dni: u.dni, nombre: u.nombre, correo: u.correo, rol: u.rol }));
  window.location.href = 'dashboard.html';
}

async function procesarCambioObligatorio(e) {
  e.preventDefault();
  const correo = document.getElementById('dniUsuarioCambio').value;
  const nueva = document.getElementById('nuevaPass').value;
  if (nueva !== document.getElementById('confirmarPass').value) return alert('Las contraseñas no coinciden.');
  const error = PE.validarPassword(nueva);
  if (error) return alert(error);

  const usuarios = JSON.parse(localStorage.getItem(PE.USERS_KEY)) || [];
  const u = usuarios.find((x) => x.correo === correo);
  if (!u) return;
  u.passHash = await PE.sha256(nueva);
  u.estado = 'Activo';
  localStorage.setItem(PE.USERS_KEY, JSON.stringify(usuarios));
  iniciarSesion(u);
}

// La semilla de usuarios se crea aquí para que el login funcione sin pasar antes por "Usuarios"
document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('usuariosRegistrados'); // formato antiguo (guardaba contraseñas en texto plano)
  if (localStorage.getItem(PE.USERS_KEY)) return;
  localStorage.setItem(PE.USERS_KEY, JSON.stringify([
    { dni: '72839401', nombre: 'Guillermo Manrique', correo: 'admin@petexperts.com', rol: 'Administrador', passHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', estado: 'Activo' },
    { dni: '45123987', nombre: 'Dra. Valeria Torres', correo: 'vtorres@petexperts.com', rol: 'Veterinario', passHash: 'f34a6df14c5cf51f29dff04e79d3b79a5a6f2011c387b8e318860192f2a1ca2b', estado: 'Activo' },
    { dni: '10982345', nombre: 'Carlos Ramírez', correo: 'cramirez@petexperts.com', rol: 'Recepcionista', passHash: '0a19533d8eae0719d0e75b3cfb2d80808111b7612756418145cc7103e621f352', estado: 'Primer Ingreso' }
  ]));
});
