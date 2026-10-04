package config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {

    private static final String URL =
            "jdbc:mysql://localhost:3306/veterinaria_db";

    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection conectar() {

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            return DriverManager.getConnection(
                    URL,
                    USER,
                    PASSWORD
            );

        } catch (Exception e) {

            System.out.println("Error: " + e.getMessage());
            return null;

        }
    }

    public static void main(String[] args) {

        Connection cn = conectar();

        if (cn != null) {
            System.out.println("Conectado a MySQL");
        } else {
            System.out.println("No conectado");
        }

    }
}
