package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Mascota;

public class MascotaDAO {

    // Listar
    public List<Mascota> listar() {

        List<Mascota> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM mascotas";

            PreparedStatement ps = cn.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Mascota mascota = new Mascota();

                mascota.setId(rs.getInt("id"));
                mascota.setCodigo(rs.getString("codigo"));
                mascota.setNombre(rs.getString("nombre"));
                mascota.setEspecie(rs.getString("especie"));
                mascota.setRaza(rs.getString("raza"));
                mascota.setSexo(rs.getString("sexo"));
                mascota.setFechaNacimiento(rs.getString("fecha_nacimiento"));
                mascota.setPesoKg(rs.getDouble("peso_kg"));
                mascota.setPropietarioId(rs.getInt("propietario_id"));

                lista.add(mascota);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }

    // Buscar por id
    public Mascota buscarPorId(int id) {

        Mascota mascota = null;

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM mascotas WHERE id = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                mascota = new Mascota();

                mascota.setId(rs.getInt("id"));
                mascota.setCodigo(rs.getString("codigo"));
                mascota.setNombre(rs.getString("nombre"));
                mascota.setEspecie(rs.getString("especie"));
                mascota.setRaza(rs.getString("raza"));
                mascota.setSexo(rs.getString("sexo"));
                mascota.setFechaNacimiento(rs.getString("fecha_nacimiento"));
                mascota.setPesoKg(rs.getDouble("peso_kg"));
                mascota.setPropietarioId(rs.getInt("propietario_id"));
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return mascota;
    }

    // Buscar por codigo
    public Mascota buscarPorCodigo(String codigo) {

        Mascota mascota = null;

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM mascotas WHERE codigo = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setString(1, codigo);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                mascota = new Mascota();

                mascota.setId(rs.getInt("id"));
                mascota.setCodigo(rs.getString("codigo"));
                mascota.setNombre(rs.getString("nombre"));
                mascota.setEspecie(rs.getString("especie"));
                mascota.setRaza(rs.getString("raza"));
                mascota.setSexo(rs.getString("sexo"));
                mascota.setFechaNacimiento(rs.getString("fecha_nacimiento"));
                mascota.setPesoKg(rs.getDouble("peso_kg"));
                mascota.setPropietarioId(rs.getInt("propietario_id"));
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return mascota;
    }

    // Listar por propietario
    public List<Mascota> listarPorPropietario(int propietarioId) {

        List<Mascota> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM mascotas WHERE propietario_id = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setInt(1, propietarioId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Mascota mascota = new Mascota();

                mascota.setId(rs.getInt("id"));
                mascota.setCodigo(rs.getString("codigo"));
                mascota.setNombre(rs.getString("nombre"));
                mascota.setEspecie(rs.getString("especie"));
                mascota.setRaza(rs.getString("raza"));
                mascota.setSexo(rs.getString("sexo"));
                mascota.setFechaNacimiento(rs.getString("fecha_nacimiento"));
                mascota.setPesoKg(rs.getDouble("peso_kg"));
                mascota.setPropietarioId(rs.getInt("propietario_id"));

                lista.add(mascota);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }

    // Guardar
    public boolean guardar(Mascota mascota) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO mascotas "
                    + "(codigo,nombre,especie,raza,sexo,"
                    + "fecha_nacimiento,peso_kg,propietario_id) "
                    + "VALUES(?,?,?,?,?,?,?,?)";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setString(1, mascota.getCodigo());
            ps.setString(2, mascota.getNombre());
            ps.setString(3, mascota.getEspecie());
            ps.setString(4, mascota.getRaza());
            ps.setString(5, mascota.getSexo());
            ps.setString(6, mascota.getFechaNacimiento());
            ps.setDouble(7, mascota.getPesoKg());
            ps.setInt(8, mascota.getPropietarioId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    // Actualizar
    public boolean actualizar(Mascota mascota) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE mascotas SET "
                    + "codigo=?,"
                    + "nombre=?,"
                    + "especie=?,"
                    + "raza=?,"
                    + "sexo=?,"
                    + "fecha_nacimiento=?,"
                    + "peso_kg=?,"
                    + "propietario_id=? "
                    + "WHERE id=?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setString(1, mascota.getCodigo());
            ps.setString(2, mascota.getNombre());
            ps.setString(3, mascota.getEspecie());
            ps.setString(4, mascota.getRaza());
            ps.setString(5, mascota.getSexo());
            ps.setString(6, mascota.getFechaNacimiento());
            ps.setDouble(7, mascota.getPesoKg());
            ps.setInt(8, mascota.getPropietarioId());
            ps.setInt(9, mascota.getId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    // Eliminar
    public boolean eliminar(int id) {

        try {

            Connection cn = Conexion.conectar();

            String sql = "DELETE FROM mascotas WHERE id = ?";

            PreparedStatement ps = cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    // Generar codigo unico para la mascota
    public String generarCodigo() {

        String codigo = "MASC-001";

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT codigo FROM mascotas ORDER BY id DESC LIMIT 1";

            PreparedStatement ps = cn.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                codigo = rs.getString("codigo");

                int numero =
                        Integer.parseInt(codigo.substring(5));

                numero++;

                codigo = String.format("MASC-%03d", numero);

            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return codigo;
    }
}