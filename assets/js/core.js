/* core.js – utilidades compartidas por todas las páginas.
 * Sesión, menú lateral único (según rol), escape de HTML y modales.
 * NOTA: este front-end funciona en "modo demostración" con localStorage.
 * La seguridad real (autenticación, roles, cifrado) debe aplicarse en el back-end Java. */
(function () {
  'use strict';

  const SESSION_KEY = 'usuarioLogueado';
  const USERS_KEY = 'usuariosRegistrados_v2';

  const MENU = [
    { key: 'dashboard',    href: 'dashboard.html',    icon: 'layout-dashboard', label: 'Inicio' },
    { key: 'usuarios',     href: 'usuarios.html',     icon: 'users',            label: 'Gestión de Usuarios' },
    { key: 'clientes',     href: 'clientes.html',     icon: 'user-check',       label: 'Gestión de Clientes' },
    { key: 'mascotas',     href: 'mascotas.html',     icon: 'dog',              label: 'Gestión de Mascotas' },
    { key: 'veterinarios', href: 'veterinarios.html', icon: 'stethoscope',      label: 'Gestión de Veterinarios' },
    { key: 'citas',        href: 'citas.html',        icon: 'calendar',         label: 'Gestión de Citas' },
    { key: 'historial',    href: 'historial.html',    icon: 'file-text',        label: 'Historial Clínico' },
    { key: 'servicios',    href: 'servicios.html',    icon: 'briefcase',        label: 'Servicios' },
    { key: 'inventario',   href: 'inventario.html',   icon: 'pill',             label: 'Inventario de Farmacia' }
  ];

  // RG-06: cada rol solo ve sus módulos (solo UX; el back-end debe volver a validarlo)
  const PERMISOS = {
    'administrador': '*',
    'recepcionista': ['dashboard', 'clientes', 'mascotas', 'citas'],
    'veterinario': ['dashboard', 'mascotas', 'citas', 'historial'],
    'encargado de farmacia': ['dashboard', 'inventario']
  };

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

  async function sha256(texto) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Política de contraseña (mínimo 8, letras y números)
  function validarPassword(p) {
    if (!p || p.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Za-z]/.test(p) || !/\d/.test(p)) return 'La contraseña debe combinar letras y números.';
    return null;
  }

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }

  const enLogin = window.location.pathname.endsWith('login.html');
  const usuario = getSession();
  if (!usuario && !enLogin) { window.location.replace('login.html'); return; }

  function renderSidebar() {
    const aside = document.getElementById('sidebar');
    if (!aside) return;
    const activa = aside.dataset.active;
    const permitido = PERMISOS[(usuario.rol || '').toLowerCase()] || ['dashboard'];
    const items = MENU.filter((m) => permitido === '*' || permitido.includes(m.key));
    if (activa && !items.some((m) => m.key === activa)) { window.location.replace('dashboard.html'); return; }
    aside.innerHTML = `
      <div>
        <div class="sidebar-header">
          <a href="dashboard.html"><img src="../assets/img/logo.jpeg" alt="Pet Experts" class="sidebar-logo"></a>
        </div>
        <ul class="sidebar-menu">
          ${items.map((m) => `
          <li class="${m.key === activa ? 'active' : ''}">
            <a href="${m.href}"${m.key === activa ? ' aria-current="page"' : ''}><i data-lucide="${m.icon}"></i><span>${esc(m.label)}</span></a>
          </li>`).join('')}
        </ul>
      </div>
      <div class="sidebar-footer">
        <div class="sidebar-user"><strong>${esc(usuario.nombre)}</strong><small>${esc(usuario.rol)}</small></div>
        <a href="#" id="btnLogout" class="btn-logout"><i data-lucide="log-out"></i><span>Cerrar Sesión</span></a>
      </div>`;
    document.getElementById('btnLogout').addEventListener('click', (e) => { e.preventDefault(); logout(); });
    if (window.lucide) window.lucide.createIcons();
  }

  // Modales: funcionan con la clase .active o con style.display (código existente)
  const modal = {
    open(id) { const m = document.getElementById(id); if (m) m.classList.add('active'); },
    close(id) { const m = document.getElementById(id); if (m) { m.classList.remove('active'); m.style.display = ''; } }
  };
  const cerrarTodos = () => document.querySelectorAll('.modal-overlay').forEach((m) => { m.classList.remove('active'); m.style.display = ''; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarTodos(); });
  document.addEventListener('click', (e) => { if (e.target.classList && e.target.classList.contains('modal-overlay')) cerrarTodos(); });

  window.PE = { esc, sha256, validarPassword, getSession, logout, modal, SESSION_KEY, USERS_KEY };
  renderSidebar();
})();
