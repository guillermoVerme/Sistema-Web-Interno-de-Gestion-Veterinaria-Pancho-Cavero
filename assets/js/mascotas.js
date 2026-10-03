// assets/js/mascotas.js

// Funciones para manejar el Modal
function abrirModalMascota() {
    const modal = document.getElementById('modalMascota');
    if(modal) {
        modal.style.display = 'flex'; // O la clase CSS que uses para mostrarlo
    }
}

function cerrarModalMascota() {
    const modal = document.getElementById('modalMascota');
    if(modal) {
        modal.style.display = 'none';
        document.getElementById('formMascota').reset(); // Limpia el formulario al cerrar
    }
}

// Función para guardar el registro
function guardarMascota(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    // Captura los datos del formulario
    const nombre = document.getElementById('nombreMascota').value;
    const especie = document.getElementById('especieMascota').value;
    const raza = document.getElementById('razaMascota').value;
    const edad = document.getElementById('edadMascota').value;
    const propietario = document.getElementById('propietarioMascota').value;

    console.log("Nueva mascota registrada:", { nombre, especie, raza, edad, propietario });
    
    // Aquí puedes agregar la lógica para insertar los datos en tu tabla HTML
    alert(`La mascota ${nombre} ha sido registrada con éxito.`);
    
    cerrarModalMascota();
}

// Función para los filtros de búsqueda
function filtrarMascotas() {
    const texto = document.getElementById('buscarMascota').value.toLowerCase();
    const especie = document.getElementById('filtroEspecie').value;
    
    console.log("Filtrando por:", { texto, especie });
    // Aquí puedes iterar sobre las filas de la tabla y usar display='none' para ocultarlas
}

// Cierra el modal si el usuario hace clic fuera del cuadro principal
window.onclick = function(event) {
    const modal = document.getElementById('modalMascota');
    if (event.target === modal) {
        cerrarModalMascota();
    }
}