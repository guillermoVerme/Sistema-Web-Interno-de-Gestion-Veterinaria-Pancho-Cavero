
package controller;

import dao.HistorialClinicoDAO;
import java.util.List;
import model.HistorialClinico;

public class HistorialController {

    private HistorialClinicoDAO historialDAO;

    public HistorialController() {
        historialDAO = new HistorialClinicoDAO();
    }

    public List<HistorialClinico> listarHistoriales() {
        return historialDAO.listar();
    }

    public HistorialClinico buscarHistorial(int id) {
        return historialDAO.buscarPorId(id);
    }

    public List<HistorialClinico> listarPorMascota(int mascotaId) {
        return historialDAO.listarPorMascota(mascotaId);
    }

    public boolean guardarHistorial(
            HistorialClinico historial) {

        return historialDAO.guardar(historial);
    }

    public boolean actualizarHistorial(
            HistorialClinico historial) {

        return historialDAO.actualizar(historial);
    }

    public boolean eliminarHistorial(int id) {
        return historialDAO.eliminar(id);
    }
}