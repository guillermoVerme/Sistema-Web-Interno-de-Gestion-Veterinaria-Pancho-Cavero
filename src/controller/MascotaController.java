package controller;

import dao.MascotaDAO;
import java.util.List;
import model.Mascota;

public class MascotaController {

    private MascotaDAO mascotaDAO;

    public MascotaController() {
        mascotaDAO = new MascotaDAO();
    }

    public List<Mascota> listarMascotas() {
        return mascotaDAO.listar();
    }

    public Mascota buscarMascota(int id) {
        return mascotaDAO.buscarPorId(id);
    }

    public Mascota buscarPorCodigo(String codigo) {
        return mascotaDAO.buscarPorCodigo(codigo);
    }

    public List<Mascota> listarPorPropietario(int propietarioId) {
        return mascotaDAO.listarPorPropietario(propietarioId);
    }

    public boolean guardarMascota(Mascota mascota) {
        return mascotaDAO.guardar(mascota);
    }

    public boolean actualizarMascota(Mascota mascota) {
        return mascotaDAO.actualizar(mascota);
    }

    public boolean eliminarMascota(int id) {
        return mascotaDAO.eliminar(id);
    }

    public String generarCodigo() {
        return mascotaDAO.generarCodigo();
    }
}