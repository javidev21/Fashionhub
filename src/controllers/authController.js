const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('../config/database');

const register = async (req, res) => {
    const { email, password } = req.body;
    const client = createClient();
    try {
        await client.connect();
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email',
            [email, hashedPassword, 'user']
        );
        res.status(201).json({ message: 'Usuario registrado', user: result.rows[0] });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario: ' + error.message });
    } finally {
        await client.end();
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const client = createClient();
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(400).json({ error: 'Error al iniciar sesión: ' + error.message });
    } finally {
        await client.end();
    }
};

module.exports = { register, login };