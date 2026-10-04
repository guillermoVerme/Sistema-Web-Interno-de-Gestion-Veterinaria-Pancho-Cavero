package controller;

import dao.CitaDAO;
import java.util.List;
import model.Cita;

public class CitaController {

    private CitaDAO citaDAO;

    public CitaController() {
        citaDAO = new CitaDAO();
    }

    public List<Cita> listarCitas() {
        return citaDAO.listar();
    }

    public Cita buscarCita(int id) {
        return citaDAO.buscarPorId(id);
    }

    public List<Cita> listarPorMascota(int mascotaId) {
        return citaDAO.listarPorMascota(mascotaId);
    }

    public List<Cita> listarPorVeterinario(int veterinarioId) {
        return citaDAO.listarPorVeterinario(veterinarioId);
    }

    public boolean guardarCita(Cita cita) {
        return citaDAO.guardar(cita);
    }

    public boolean actualizarCita(Cita cita) {
        return citaDAO.actualizar(cita);
    }

    public boolean eliminarCita(int id) {
        return citaDAO.eliminar(id);
    }
}