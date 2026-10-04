
package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Producto;

public class ProductoDAO {

    // Listar
    public List<Producto> listar() {

        List<Producto> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM inventario";

            PreparedStatement ps = cn.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Producto p = new Producto();

                p.setId(rs.getInt("id"));
                p.setCodigo(rs.getString("codigo"));
                p.setProducto(rs.getString("producto"));
                p.setCategoria(rs.getString("categoria"));
                p.setStock(rs.getInt("stock"));
                p.setStockMinimo(rs.getInt("stock_minimo"));
                p.setPrecioUnitario(rs.getDouble("precio_unitario"));

                lista.add(p);
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return lista;
    }

    // Buscar por id
    public Producto buscarPorId(int id) {

        Producto p = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM inventario WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                p = new Producto();

                p.setId(rs.getInt("id"));
                p.setCodigo(rs.getString("codigo"));
                p.setProducto(rs.getString("producto"));
                p.setCategoria(rs.getString("categoria"));
                p.setStock(rs.getInt("stock"));
                p.setStockMinimo(rs.getInt("stock_minimo"));
                p.setPrecioUnitario(rs.getDouble("precio_unitario"));
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return p;
    }

    // Guardar
    public boolean guardar(Producto producto) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO inventario "
                    + "(codigo,producto,categoria,"
                    + "stock,stock_minimo,precio_unitario)"
                    + " VALUES(?,?,?,?,?,?)";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, producto.getCodigo());
            ps.setString(2, producto.getProducto());
            ps.setString(3, producto.getCategoria());
            ps.setInt(4, producto.getStock());
            ps.setInt(5, producto.getStockMinimo());
            ps.setDouble(6, producto.getPrecioUnitario());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Actualizar
    public boolean actualizar(Producto producto) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE inventario SET "
                    + "codigo=?,"
                    + "producto=?,"
                    + "categoria=?,"
                    + "stock=?,"
                    + "stock_minimo=?,"
                    + "precio_unitario=? "
                    + "WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, producto.getCodigo());
            ps.setString(2, producto.getProducto());
            ps.setString(3, producto.getCategoria());
            ps.setInt(4, producto.getStock());
            ps.setInt(5, producto.getStockMinimo());
            ps.setDouble(6, producto.getPrecioUnitario());
            ps.setInt(7, producto.getId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Eliminar
    public boolean eliminar(int id) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "DELETE FROM inventario WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Buscar por codigo
    public Producto buscarPorCodigo(String codigo) {

        Producto p = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM inventario WHERE codigo=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, codigo);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                p = new Producto();

                p.setId(rs.getInt("id"));
                p.setCodigo(rs.getString("codigo"));
                p.setProducto(rs.getString("producto"));
                p.setCategoria(rs.getString("categoria"));
                p.setStock(rs.getInt("stock"));
                p.setStockMinimo(rs.getInt("stock_minimo"));
                p.setPrecioUnitario(rs.getDouble("precio_unitario"));
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return p;
    }

    // Productos con stock bajo
    public List<Producto> listarStockBajo() {

        List<Producto> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM inventario WHERE stock <= stock_minimo";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                Producto p = new Producto();

                p.setId(rs.getInt("id"));
                p.setCodigo(rs.getString("codigo"));
                p.setProducto(rs.getString("producto"));
                p.setCategoria(rs.getString("categoria"));
                p.setStock(rs.getInt("stock"));
                p.setStockMinimo(rs.getInt("stock_minimo"));
                p.setPrecioUnitario(rs.getDouble("precio_unitario"));

                lista.add(p);
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return lista;
    }

}