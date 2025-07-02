const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Sequelize (conexión a PostgreSQL en Render)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

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
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL exitosa');
        await sequelize.sync();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});