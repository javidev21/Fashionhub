const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('../config/database');

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.connect();
        const result = await client.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email',
            [email, hashedPassword, 'user']
        );
        await client.end();
        res.status(201).json({ message: 'Usuario registrado', user: result.rows[0] });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario: ' + error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        await client.end();
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(400).json({ error: 'Error al iniciar sesión: ' + error.message });
    }
};

module.exports = { register, login };