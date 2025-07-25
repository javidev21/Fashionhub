const { createClient } = require('../config/database');

const getProducts = async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const result = await client.query('SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos: ' + error.message });
    } finally {
        await client.end();
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock, size, category_id, image_url } = req.body;
    const client = createClient();
    try {
        await client.connect();
        const result = await client.query(
            'INSERT INTO products (name, description, price, stock, size, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, description, price, stock, size, category_id, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto: ' + error.message });
    } finally {
        await client.end();
    }
};

module.exports = { getProducts, createProduct };