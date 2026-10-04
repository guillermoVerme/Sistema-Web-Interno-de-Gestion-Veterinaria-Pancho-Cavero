package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.Cita;

public class CitaDAO {

    // Listar
    public List<Cita> listar() {

        List<Cita> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql = "SELECT * FROM citas";

            PreparedStatement ps = cn.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Cita cita = new Cita();

                cita.setId(rs.getInt("id"));
                cita.setFecha(rs.getString("fecha"));
                cita.setHora(rs.getString("hora"));
                cita.setMotivo(rs.getString("motivo"));
                cita.setEstado(rs.getString("estado"));
                cita.setMascotaId(rs.getInt("mascota_id"));
                cita.setPropietarioId(rs.getInt("propietario_id"));
                cita.setVeterinarioId(rs.getInt("veterinario_id"));

                lista.add(cita);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }

    // Buscar por id
    public Cita buscarPorId(int id) {

        Cita cita = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM citas WHERE id = ?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                cita = new Cita();

                cita.setId(rs.getInt("id"));
                cita.setFecha(rs.getString("fecha"));
                cita.setHora(rs.getString("hora"));
                cita.setMotivo(rs.getString("motivo"));
                cita.setEstado(rs.getString("estado"));
                cita.setMascotaId(rs.getInt("mascota_id"));
                cita.setPropietarioId(rs.getInt("propietario_id"));
                cita.setVeterinarioId(rs.getInt("veterinario_id"));

            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return cita;
    }

    // Guardar
    public boolean guardar(Cita cita) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO citas(fecha,hora,motivo,estado,"
                    + "mascota_id,propietario_id,veterinario_id) "
                    + "VALUES(?,?,?,?,?,?,?)";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, cita.getFecha());
            ps.setString(2, cita.getHora());
            ps.setString(3, cita.getMotivo());
            ps.setString(4, cita.getEstado());
            ps.setInt(5, cita.getMascotaId());
            ps.setInt(6, cita.getPropietarioId());
            ps.setInt(7, cita.getVeterinarioId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;

        }
    }

    // Actualizar
    public boolean actualizar(Cita cita) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE citas SET "
                    + "fecha=?,"
                    + "hora=?,"
                    + "motivo=?,"
                    + "estado=?,"
                    + "mascota_id=?,"
                    + "propietario_id=?,"
                    + "veterinario_id=? "
                    + "WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1, cita.getFecha());
            ps.setString(2, cita.getHora());
            ps.setString(3, cita.getMotivo());
            ps.setString(4, cita.getEstado());
            ps.setInt(5, cita.getMascotaId());
            ps.setInt(6, cita.getPropietarioId());
            ps.setInt(7, cita.getVeterinarioId());
            ps.setInt(8, cita.getId());

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

            String sql =
                    "DELETE FROM citas WHERE id = ?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return false;

        }
    }

    // Listar por mascota
    public List<Cita> listarPorMascota(int mascotaId) {

        List<Cita> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM citas WHERE mascota_id = ?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, mascotaId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Cita cita = new Cita();

                cita.setId(rs.getInt("id"));
                cita.setFecha(rs.getString("fecha"));
                cita.setHora(rs.getString("hora"));
                cita.setMotivo(rs.getString("motivo"));
                cita.setEstado(rs.getString("estado"));
                cita.setMascotaId(rs.getInt("mascota_id"));
                cita.setPropietarioId(rs.getInt("propietario_id"));
                cita.setVeterinarioId(rs.getInt("veterinario_id"));

                lista.add(cita);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }

    // Lisatr por veterinario
    public List<Cita> listarPorVeterinario(int veterinarioId) {

        List<Cita> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM citas WHERE veterinario_id = ?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, veterinarioId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Cita cita = new Cita();

                cita.setId(rs.getInt("id"));
                cita.setFecha(rs.getString("fecha"));
                cita.setHora(rs.getString("hora"));
                cita.setMotivo(rs.getString("motivo"));
                cita.setEstado(rs.getString("estado"));
                cita.setMascotaId(rs.getInt("mascota_id"));
                cita.setPropietarioId(rs.getInt("propietario_id"));
                cita.setVeterinarioId(rs.getInt("veterinario_id"));

                lista.add(cita);
            }

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());

        }

        return lista;
    }
}