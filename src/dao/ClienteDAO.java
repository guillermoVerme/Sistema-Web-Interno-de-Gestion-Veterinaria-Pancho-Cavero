package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Cliente;

public class ClienteDAO {

    // Listar todos los clientes
    public List<Cliente> listar() {

        List<Cliente> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM propietarios";

            PreparedStatement ps = cn.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Cliente cliente = new Cliente();

                cliente.setId(rs.getInt("id"));
                cliente.setDni(rs.getString("dni"));
                cliente.setNombre(rs.getString("nombre"));
                cliente.setTelefono(rs.getString("telefono"));
                cliente.setEmail(rs.getString("email"));
                cliente.setDireccion(rs.getString("direccion"));

                lista.add(cliente);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }

    // Buscar un cliente por su id
    public Cliente buscarPorId(int id) {

        Cliente cliente = null;

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM propietarios WHERE id = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                cliente = new Cliente();

                cliente.setId(rs.getInt("id"));
                cliente.setDni(rs.getString("dni"));
                cliente.setNombre(rs.getString("nombre"));
                cliente.setTelefono(rs.getString("telefono"));
                cliente.setEmail(rs.getString("email"));
                cliente.setDireccion(rs.getString("direccion"));
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return cliente;
    }

    // Guardar un nuevo cliente
    public boolean guardar(Cliente cliente) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO propietarios(dni,nombre,telefono,email,direccion) "
                    + "VALUES(?,?,?,?,?)";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setString(1, cliente.getDni());
            ps.setString(2, cliente.getNombre());
            ps.setString(3, cliente.getTelefono());
            ps.setString(4, cliente.getEmail());
            ps.setString(5, cliente.getDireccion());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;

        }
    }

    // Actualizar un cliente existente
    public boolean actualizar(Cliente cliente) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE propietarios "
                    + "SET dni=?, nombre=?, telefono=?, email=?, direccion=? "
                    + "WHERE id=?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setString(1, cliente.getDni());
            ps.setString(2, cliente.getNombre());
            ps.setString(3, cliente.getTelefono());
            ps.setString(4, cliente.getEmail());
            ps.setString(5, cliente.getDireccion());
            ps.setInt(6, cliente.getId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;

        }
    }

    // Eliminar un cliente por su id
    public boolean eliminar(int id) {

        try {

            Connection cn = Conexion.conectar();

            String sql = "DELETE FROM propietarios WHERE id = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;

        }
    }
}