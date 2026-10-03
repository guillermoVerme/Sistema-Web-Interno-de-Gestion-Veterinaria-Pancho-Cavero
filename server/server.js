const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Pool de conexiones a MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Tu usuario de MySQL
    password: '',      // Tu contraseña de MySQL
    database: 'veterinaria_db',
    waitForConnections: true,
    connectionLimit: 10
});

// ------------------------------------------------------------
// ENDPOINTS DE AUTENTICACIÓN
// ------------------------------------------------------------

// Login llamando a sp_login_usuario
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('CALL sp_login_usuario(?, ?)', [email, password]);
        const usuarios = rows[0];

        if (usuarios.length > 0) {
            res.json({ success: true, user: usuarios[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas o usuario inactivo' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error de servidor: ' + error.message });
    }
});

// ------------------------------------------------------------
// ENDPOINTS DE DASHBOARD Y METRICAS
// ------------------------------------------------------------

app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const [[citasHoy]] = await db.query('SELECT COUNT(*) AS total FROM citas WHERE fecha = CURDATE()');
        const [[pacientes]] = await db.query('SELECT COUNT(*) AS total FROM mascotas');
        const [[alertasStock]] = await db.query('SELECT COUNT(*) AS total FROM inventario WHERE stock <= stock_minimo');

        res.json({
            citasHoy: citasHoy.total,
            pacientesAtendidos: 8, // Métricas operativas
            mascotasRegistradas: pacientes.total,
            alertasStock: alertasStock.total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------------------------------------
// ENDPOINTS DE CITAS
// ------------------------------------------------------------

// Listar Citas desde la Vista
app.get('/api/citas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vw_resumen_citas ORDER BY fecha DESC, hora_formateada ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Registrar Cita mediante Procedimiento Almacenado
app.post('/api/citas', async (req, res) => {
    const { fecha, hora, motivo, mascota_id, propietario_id, veterinario_id } = req.body;
    try {
        await db.query('CALL sp_registrar_cita(?, ?, ?, ?, ?, ?)', [
            fecha, hora, motivo, mascota_id, propietario_id, veterinario_id
        ]);
        res.json({ success: true, message: 'Cita registrada con éxito' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ------------------------------------------------------------
// ENDPOINT DE MASCOTAS
// ------------------------------------------------------------

app.get('/api/mascotas', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                m.codigo, 
                m.nombre, 
                CONCAT(m.especie, ' / ', m.raza) AS especie_raza,
                CONCAT(TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()), ' años') AS edad,
                p.nombre AS propietario
            FROM mascotas m
            INNER JOIN propietarios p ON m.propietario_id = p.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------------------------------------
// ENDPOINT DE HISTORIAL CLINICO
// ------------------------------------------------------------

app.get('/api/historial', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                DATE_FORMAT(h.fecha_atencion, '%d/%m/%Y') AS fecha,
                CONCAT(m.nombre, ' (', m.raza, ')') AS paciente,
                h.diagnostico,
                h.tratamiento,
                u.nombre AS veterinario
            FROM historial_clinico h
            INNER JOIN mascotas m ON h.mascota_id = m.id
            INNER JOIN usuarios u ON h.veterinario_id = u.id
            ORDER BY h.fecha_atencion DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------------------------------------------------
// ENDPOINT DE INVENTARIO
// ------------------------------------------------------------

app.get('/api/inventario', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vw_estado_inventario');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});