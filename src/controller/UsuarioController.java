package controller;

import dao.UsuarioDAO;
import java.util.List;
import model.Usuario;

public class UsuarioController {

    private UsuarioDAO usuarioDAO;

    public UsuarioController() {

        usuarioDAO = new UsuarioDAO();

    }

    // Login
    public Usuario iniciarSesion(
            String email,
            String password) {

        return usuarioDAO.validarLogin(
                email,
                password);

    }

    // Listar
    public List<Usuario> listarUsuarios() {

        return usuarioDAO.listar();

    }

    // Buscar
    public Usuario buscarUsuario(
            int id) {

        return usuarioDAO.buscarPorId(id);

    }

    // Guardar
    public boolean guardarUsuario(
            Usuario usuario) {

        return usuarioDAO.guardar(usuario);

    }

    // Actualizar
    public boolean actualizarUsuario(
            Usuario usuario) {

        return usuarioDAO.actualizar(usuario);

    }

    // Eliminar
    public boolean eliminarUsuario(
            int id) {

        return usuarioDAO.eliminar(id);

    }

}