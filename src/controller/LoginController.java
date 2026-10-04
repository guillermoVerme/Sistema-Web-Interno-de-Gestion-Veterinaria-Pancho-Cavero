package controller;

import dao.UsuarioDAO;
import model.Usuario;

public class LoginController {

    private UsuarioDAO usuarioDAO;

    public LoginController() {
        usuarioDAO = new UsuarioDAO();
    }

    public Usuario iniciarSesion(
            String email,
            String password) {

        return usuarioDAO.validarLogin(
                email,
                password);
    }
}