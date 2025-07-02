const Order = require('./order');
const OrderDetail = require('./orderDetail');

Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { Product, Category, Order, OrderDetail };