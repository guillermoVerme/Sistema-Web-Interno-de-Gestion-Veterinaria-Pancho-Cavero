package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Usuario;

public class UsuarioDAO {

    // Login
    public Usuario validarLogin(
            String email,
            String password) {

        Usuario usuario = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM usuarios "
                    + "WHERE email=? AND password=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, email);
            ps.setString(2, password);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                usuario = new Usuario();

                usuario.setId(rs.getInt("id"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setEmail(rs.getString("email"));
                usuario.setPassword(rs.getString("password"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getString("estado"));
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return usuario;
    }

    // Listar
    public List<Usuario> listar() {

        List<Usuario> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM usuarios";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                Usuario usuario = new Usuario();

                usuario.setId(rs.getInt("id"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setEmail(rs.getString("email"));
                usuario.setPassword(rs.getString("password"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getString("estado"));

                lista.add(usuario);

            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return lista;
    }

    // Buscar por id
    public Usuario buscarPorId(int id) {

        Usuario usuario = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM usuarios WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                usuario = new Usuario();

                usuario.setId(rs.getInt("id"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setEmail(rs.getString("email"));
                usuario.setPassword(rs.getString("password"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getString("estado"));

            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return usuario;
    }

    // Buscar por email
    public Usuario buscarPorEmail(String email) {

        Usuario usuario = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM usuarios WHERE email=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, email);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                usuario = new Usuario();

                usuario.setId(rs.getInt("id"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setEmail(rs.getString("email"));
                usuario.setPassword(rs.getString("password"));
                usuario.setRol(rs.getString("rol"));
                usuario.setEstado(rs.getString("estado"));

            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return usuario;
    }

    // Guardar
    public boolean guardar(Usuario usuario) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO usuarios "
                    + "(nombre,email,password,rol,estado) "
                    + "VALUES(?,?,?,?,?)";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, usuario.getNombre());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getPassword());
            ps.setString(4, usuario.getRol());
            ps.setString(5, usuario.getEstado());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Actualizar
    public boolean actualizar(Usuario usuario) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE usuarios SET "
                    + "nombre=?,"
                    + "email=?,"
                    + "password=?,"
                    + "rol=?,"
                    + "estado=? "
                    + "WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, usuario.getNombre());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getPassword());
            ps.setString(4, usuario.getRol());
            ps.setString(5, usuario.getEstado());
            ps.setInt(6, usuario.getId());

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
                    "DELETE FROM usuarios WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }
}