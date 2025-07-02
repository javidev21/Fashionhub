const Product = require('../models/product');
const Category = require('../models/category');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos: ' + error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock, size, category_id, image_url } = req.body;
    // Verificar si es admin (puedes usar middleware)
    try {
        const product = await Product.create({ name, description, price, stock, size, category_id, image_url });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto: ' + error.message });
    }
};

module.exports = { getProducts, createProduct };