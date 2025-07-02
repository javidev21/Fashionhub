const express = require('express');
const path = require('path');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const client = require('./src/config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'FashionHub - Tienda de Ropa' });
});

// Iniciar servidor
app.listen(port, async () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    // La conexión a la base de datos se maneja en los controladores
});