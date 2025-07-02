const client = require('../config/database');

const createOrder = async (req, res) => {
    const { user_id, items } = req.body; // items: [{ product_id, quantity, price }]
    try {
        await client.connect();
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const orderResult = await client.query(
            'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
            [user_id, total, 'pending']
        );
        const order = orderResult.rows[0];

        for (const item of items) {
            await client.query(
                'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [order.id, item.product_id, item.quantity, item.price]
            );
        }
        await client.end();
        res.status(201).json({ message: 'Pedido creado', order });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear pedido: ' + error.message });
    }
};

module.exports = { createOrder };