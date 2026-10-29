const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. GET: Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets ORDER BY fechaRegistro DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tickets', error: error.message });
    }
});

// 2. GET: Obtener ticket por ID
app.get('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el ticket', error: error.message });
    }
});

// 3. POST: Crear un nuevo ticket
app.post('/api/tickets', async (req, res) => {
    try {
        const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;
        
        // Validación básica
        if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [asunto, solicitante, descripcion, categoria, prioridad, estado]);

        res.status(201).json({ id: result.insertId, mensaje: 'Ticket creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear ticket', error: error.message });
    }
});

// 4. PUT: Actualizar un ticket existente
app.put('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

        const query = 'UPDATE tickets SET asunto = ?, solicitante = ?, descripcion = ?, categoria = ?, prioridad = ?, estado = ? WHERE id = ?';
        const [result] = await db.query(query, [asunto, solicitante, descripcion, categoria, prioridad, estado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado para actualizar' });
        }

        res.json({ mensaje: 'Ticket actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar ticket', error: error.message });
    }
});

// 5. DELETE: Eliminar un ticket
app.delete('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado para eliminar' });
        }

        res.json({ mensaje: 'Ticket eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar ticket', error: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});