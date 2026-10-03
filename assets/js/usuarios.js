/* usuarios.js – Gestión de usuarios internos (modo demostración). Requiere core.js
 * RF-02 / RG-04: las cuentas no se eliminan; se activan y desactivan. */
const ESTADO_BADGE = { 'Activo': 'badge-success', 'Primer Ingreso': 'badge-warning', 'Inactivo': 'badge-cancelada' };
let dniEnEdicion = null;

const leerUsuarios = () => JSON.parse(localStorage.getItem(PE.USERS_KEY)) || [];
const guardarUsuarios = (lista) => localStorage.setItem(PE.USERS_KEY, JSON.stringify(lista));
const $ = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
  renderizarTablaUsuarios();
  $('formUsuario').addEventListener('submit', guardarUsuario);
  $('tablaUsuariosBody').addEventListener('click', (e) => { // delegación: sin onclick con datos dentro del HTML
    const btn = e.target.closest('button[data-accion]');
    if (!btn) return;
    if (btn.dataset.accion === 'editar') prepararEdicion(btn.dataset.dni);
    if (btn.dataset.accion === 'estado') cambiarEstadoUsuario(btn.dataset.dni);
  });
});

function renderizarTablaUsuarios() {
  $('tablaUsuariosBody').innerHTML = leerUsuarios().map((u) => `
    <tr>
      <td><strong>${PE.esc(u.dni)}</strong></td>
      <td>${PE.esc(u.nombre)}</td>
      <td>${PE.esc(u.correo)}</td>
      <td>${PE.esc(u.rol)}</td>
      <td><span class="badge ${ESTADO_BADGE[u.estado] || 'badge-warning'}">${PE.esc(u.estado)}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit" title="Editar usuario" data-accion="editar" data-dni="${PE.esc(u.dni)}"><i data-lucide="pencil"></i></button>
          <button class="btn-icon delete" title="${u.estado === 'Inactivo' ? 'Activar' : 'Desactivar'} usuario" data-accion="estado" data-dni="${PE.esc(u.dni)}"><i data-lucide="${u.estado === 'Inactivo' ? 'user-check' : 'user-x'}"></i></button>
        </div>
      </td>
    </tr>`).join('');
  if (window.lucide) lucide.createIcons();
}

function abrirModalNuevoUsuario() {
  dniEnEdicion = null;
  $('formUsuario').reset();
  $('modalTitulo').innerText = 'Nuevo Usuario';
  $('btnGuardarModal').innerText = 'Guardar Usuario';
  $('inputDni').disabled = false;
  $('grupoPassword').style.display = 'block';
  $('inputPassword').required = true;
  $('modalUsuario').classList.add('active');
}

function prepararEdicion(dni) {
  const u = leerUsuarios().find((x) => x.dni === dni);
  if (!u) return;
  dniEnEdicion = dni;
  $('modalTitulo').innerText = 'Editar Usuario';
  $('btnGuardarModal').innerText = 'Guardar cambios';
  $('inputDni').value = u.dni;
  $('inputDni').disabled = true;
  $('inputNombre').value = u.nombre;
  $('inputCorreo').value = u.correo;
  $('selectRol').value = u.rol;
  $('grupoPassword').style.display = 'none'; // la contraseña no se cambia desde aquí
  $('inputPassword').required = false;
  $('modalUsuario').classList.add('active');
}

function cerrarModal() { PE.modal.close('modalUsuario'); }

function generarPasswordTemporal() {
  const azar = crypto.getRandomValues(new Uint32Array(1))[0] % 9000 + 1000;
  $('inputPassword').value = 'Pet' + azar + '*';
}

async function guardarUsuario(e) {
  e.preventDefault();
  const usuarios = leerUsuarios();
  const dni = $('inputDni').value.trim();
  const nombre = $('inputNombre').value.trim();
  const correo = $('inputCorreo').value.trim().toLowerCase();
  const rol = $('selectRol').value;

  if (!/^\d{8}$/.test(dni)) return alert('El DNI debe tener exactamente 8 dígitos.');
  if (usuarios.some((u) => u.correo.toLowerCase() === correo && u.dni !== dniEnEdicion)) return alert('Ese correo ya está registrado.');

  if (dniEnEdicion) {
    const u = usuarios.find((x) => x.dni === dniEnEdicion);
    if (u.rol === 'Administrador' && rol !== 'Administrador' && usuarios.filter((x) => x.rol === 'Administrador').length <= 1) {
      return alert('Debe existir al menos un Administrador.');
    }
    Object.assign(u, { nombre, correo, rol });
  } else {
    if (usuarios.some((u) => u.dni === dni)) return alert('Ya existe un usuario con ese DNI.');
    const pass = $('inputPassword').value;
    const error = PE.validarPassword(pass);
    if (error) return alert(error);
    usuarios.push({ dni, nombre, correo, rol, passHash: await PE.sha256(pass), estado: 'Primer Ingreso' });
  }
  guardarUsuarios(usuarios);
  renderizarTablaUsuarios();
  cerrarModal();
}

function cambiarEstadoUsuario(dni) {
  const usuarios = leerUsuarios();
  const u = usuarios.find((x) => x.dni === dni);
  if (!u) return;
  if (u.estado !== 'Inactivo') { // desactivar
    if (PE.getSession()?.dni === dni) return alert('No puedes desactivar tu propia cuenta.');
    if (u.rol === 'Administrador' && usuarios.filter((x) => x.rol === 'Administrador' && x.estado !== 'Inactivo').length <= 1) {
      return alert('No puedes desactivar al único Administrador activo.');
    }
    if (!confirm(`¿Desactivar la cuenta de "${u.nombre}"? Podrás reactivarla después.`)) return;
    u.estado = 'Inactivo';
  } else {
    u.estado = 'Activo';
  }
  guardarUsuarios(usuarios);
  renderizarTablaUsuarios();
}
