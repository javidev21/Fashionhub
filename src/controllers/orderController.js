const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');

const createOrder = async (req, res) => {
    const { user_id, items } = req.body; // items: [{ product_id, quantity, price }]
    try {
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const order = await Order.create({ user_id, total });

        const orderDetails = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));
        await OrderDetail.bulkCreate(orderDetails);

        res.status(201).json({ message: 'Pedido creado', order });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear pedido: ' + error.message });
    }
};

module.exports = { createOrder };