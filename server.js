// Student Management System - Backend Server
// Node.js + Express + PostgreSQL

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // HTML, CSS, JS files yahan se serve hongi

// ---------- DATABASE CONNECTION ----------
// Neeche apni PostgreSQL details daalein (user, password wagera)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// ---------- ROUTES (API) ----------

// 1) Sab students get karo
app.get('/api/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 2) Naya student add karo
app.post('/api/students', async (req, res) => {
    try {
        const { name, roll_no, department, semester, email } = req.body;
        const result = await pool.query(
            `INSERT INTO students (name, roll_no, department, semester, email)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, roll_no, department, semester, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 3) Student update karo
app.put('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, roll_no, department, semester, email } = req.body;
        const result = await pool.query(
            `UPDATE students SET name=$1, roll_no=$2, department=$3, semester=$4, email=$5
             WHERE id=$6 RETURNING *`,
            [name, roll_no, department, semester, email, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 4) Student delete karo
app.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM students WHERE id=$1', [id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
});
