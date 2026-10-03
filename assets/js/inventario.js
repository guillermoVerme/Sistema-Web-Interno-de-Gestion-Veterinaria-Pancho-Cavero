document.addEventListener('DOMContentLoaded', () => {
    cargarInventario();
});

async function cargarInventario() {
    try {
        const response = await fetch('http://localhost:3000/api/inventario');
        const productos = await response.json();

        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        productos.forEach(prod => {
            const esCritico = prod.estado_stock === 'Stock Crítico';
            const badgeClass = esCritico ? 'badge-critico' : 'badge-confirmada';
            const btnClass = esCritico ? 'btn-primary' : 'btn-outline';
            const btnText = esCritico ? 'Pedir Stock' : 'Ajustar';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${prod.codigo}</td>
                <td>${prod.producto}</td>
                <td>${prod.categoria}</td>
                <td>${prod.stock} unidades</td>
                <td><span class="badge ${badgeClass}">${prod.estado_stock}</span></td>
                <td>
                    <button class="btn ${btnClass} btn-sm">${btnText}</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al obtener inventario:', error);
    }
}