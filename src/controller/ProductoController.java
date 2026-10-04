package controller;

import dao.ProductoDAO;
import java.util.List;
import model.Producto;

public class ProductoController {

    private ProductoDAO productoDAO;

    public ProductoController() {
        productoDAO = new ProductoDAO();
    }

    public List<Producto> listarProductos() {
        return productoDAO.listar();
    }

    public Producto buscarProducto(int id) {
        return productoDAO.buscarPorId(id);
    }

    public Producto buscarPorCodigo(String codigo) {
        return productoDAO.buscarPorCodigo(codigo);
    }

    public List<Producto> listarStockBajo() {
        return productoDAO.listarStockBajo();
    }

    public boolean guardarProducto(Producto producto) {
        return productoDAO.guardar(producto);
    }

    public boolean actualizarProducto(Producto producto) {
        return productoDAO.actualizar(producto);
    }

    public boolean eliminarProducto(int id) {
        return productoDAO.eliminar(id);
    }
}