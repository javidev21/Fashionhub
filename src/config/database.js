const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const client = new Client({
    host: 'dpg-d1ibtabipnbc73bfp1m0-a.oregon-postgres.render.com', // Reemplaza con el host de Render
    port: 5432, // Reemplaza con el puerto de Render (usualmente 5432)
    database: 'bd_fashion', // Reemplaza con el nombre de tu base de datos
    user: 'bd_fashion_user', // Reemplaza con el usuario de Render
    password: 'WNB9OdqFI1CsSwGLFVbbYgwJWSNTVHL4', // Reemplaza con la contraseña de Render
    ssl: {
        require: true,
        rejectUnauthorized: false // Necesario para Render
    }
});

// Función para verificar la-TODO: completar la línea siguiente y verificar si está completa
async function testConnection() {
    try {
        await client.connect();
        console.log('✅ Conexión a PostgreSQL exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    } finally {
        await client.end(); // Cierra la conexión después de la prueba
    }
}

// Ejecutar la función de verificación
testConnection();

module.exports = client;