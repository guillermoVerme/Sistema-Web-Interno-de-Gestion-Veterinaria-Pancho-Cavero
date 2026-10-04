/*package servlet;

import controller.LoginController;
import model.Usuario;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private LoginController controller;

    @Override
    public void init() {

        controller = new LoginController();

    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String email =
                request.getParameter("email");

        String password =
                request.getParameter("password");

        Usuario usuario =
                controller.iniciarSesion(
                        email,
                        password);

        if (usuario != null) {

            request.getSession().setAttribute(
                    "usuario",
                    usuario);

            response.getWriter().write("OK");

        } else {

            response.getWriter().write("ERROR");

        }
    }
}*/