const { Sequelize } = require('sequelize');

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

// Probar la conexión
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    }
}

// Ejecutar la prueba de conexión
testConnection();

module.exports = sequelize;