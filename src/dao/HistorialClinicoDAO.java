package dao;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import model.HistorialClinico;

public class HistorialClinicoDAO {

    // Listar
    public List<HistorialClinico> listar() {

        List<HistorialClinico> lista = new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM historial_clinico";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                HistorialClinico h =
                        new HistorialClinico();

                h.setId(rs.getInt("id"));
                h.setFechaAtencion(
                        rs.getString("fecha_atencion"));
                h.setDiagnostico(
                        rs.getString("diagnostico"));
                h.setTratamiento(
                        rs.getString("tratamiento"));
                h.setObservaciones(
                        rs.getString("observaciones"));
                h.setMascotaId(
                        rs.getInt("mascota_id"));
                h.setVeterinarioId(
                        rs.getInt("veterinario_id"));

                lista.add(h);
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return lista;
    }

    // Buscr por id
    public HistorialClinico buscarPorId(int id) {

        HistorialClinico h = null;

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM historial_clinico WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                h = new HistorialClinico();

                h.setId(rs.getInt("id"));
                h.setFechaAtencion(
                        rs.getString("fecha_atencion"));
                h.setDiagnostico(
                        rs.getString("diagnostico"));
                h.setTratamiento(
                        rs.getString("tratamiento"));
                h.setObservaciones(
                        rs.getString("observaciones"));
                h.setMascotaId(
                        rs.getInt("mascota_id"));
                h.setVeterinarioId(
                        rs.getInt("veterinario_id"));
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return h;
    }

    // Guardar un nuevo historial clinico
    public boolean guardar(
            HistorialClinico historial) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "INSERT INTO historial_clinico "
                    + "(fecha_atencion,diagnostico,"
                    + "tratamiento,observaciones,"
                    + "mascota_id,veterinario_id,cita_id)"
                    + " VALUES(?,?,?,?,?,?,?)";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1,
                    historial.getFechaAtencion());

            ps.setString(2,
                    historial.getDiagnostico());

            ps.setString(3,
                    historial.getTratamiento());

            ps.setString(4,
                    historial.getObservaciones());

            ps.setInt(5,
                    historial.getMascotaId());

            ps.setInt(6,
                    historial.getVeterinarioId());

            ps.setObject(7,
                    historial.getCitaId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Actualizar un historial clinico existente
    public boolean actualizar(
            HistorialClinico historial) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "UPDATE historial_clinico SET "
                    + "fecha_atencion=?,"
                    + "diagnostico=?,"
                    + "tratamiento=?,"
                    + "observaciones=?,"
                    + "mascota_id=?,"
                    + "veterinario_id=?,"
                    + "cita_id=? "
                    + "WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setString(1,
                    historial.getFechaAtencion());

            ps.setString(2,
                    historial.getDiagnostico());

            ps.setString(3,
                    historial.getTratamiento());

            ps.setString(4,
                    historial.getObservaciones());

            ps.setInt(5,
                    historial.getMascotaId());

            ps.setInt(6,
                    historial.getVeterinarioId());

            ps.setObject(7,
                    historial.getCitaId());

            ps.setInt(8,
                    historial.getId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Eliminar un historial clinico por su id
    public boolean eliminar(int id) {

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "DELETE FROM historial_clinico WHERE id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            System.out.println(e.getMessage());

            return false;
        }
    }

    // Listar por mascota
    public List<HistorialClinico> listarPorMascota(
            int mascotaId) {

        List<HistorialClinico> lista =
                new ArrayList<>();

        try {

            Connection cn = Conexion.conectar();

            String sql =
                    "SELECT * FROM historial_clinico "
                    + "WHERE mascota_id=?";

            PreparedStatement ps =
                    cn.prepareStatement(sql);

            ps.setInt(1, mascotaId);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                HistorialClinico h =
                        new HistorialClinico();

                h.setId(rs.getInt("id"));
                h.setFechaAtencion(
                        rs.getString("fecha_atencion"));
                h.setDiagnostico(
                        rs.getString("diagnostico"));
                h.setTratamiento(
                        rs.getString("tratamiento"));
                h.setObservaciones(
                        rs.getString("observaciones"));
                h.setMascotaId(
                        rs.getInt("mascota_id"));
                h.setVeterinarioId(
                        rs.getInt("veterinario_id"));

                lista.add(h);
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());

        }

        return lista;
    }
}