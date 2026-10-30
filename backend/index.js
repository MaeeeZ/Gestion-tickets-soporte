const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al consultar tickets:', error);
        res.status(500).json({ mensaje: 'Error al obtener tickets', error: error.message });
    }
});

app.get('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error GET /api/tickets/:id:', error);
        res.status(500).json({ mensaje: 'Error al obtener el ticket', error: error.message });
    }
});

app.post('/api/tickets', async (req, res) => {
    try {
        console.log('Datos recibidos en POST:', req.body);
        const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;
        
        if (!asunto || !solicitante || !descripcion) {
            return res.status(400).json({ mensaje: 'Asunto, solicitante y descripción son obligatorios' });
        }

        const query = 'INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [
            asunto, 
            solicitante, 
            descripcion, 
            categoria || 'Sistemas', 
            prioridad || 'Media', 
            estado || 'Abierto'
        ]);

        res.status(201).json({ id: result.insertId, mensaje: 'Ticket creado exitosamente' });
    } catch (error) {
        console.error('Error POST /api/tickets:', error);
        res.status(500).json({ mensaje: 'Error al crear ticket', error: error.message });
    }
});

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
        console.error('Error PUT /api/tickets/:id:', error);
        res.status(500).json({ mensaje: 'Error al actualizar ticket', error: error.message });
    }
});

app.delete('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado para eliminar' });
        }

        res.json({ mensaje: 'Ticket eliminado correctamente' });
    } catch (error) {
        console.error('Error DELETE /api/tickets/:id:', error);
        res.status(500).json({ mensaje: 'Error al eliminar ticket', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});