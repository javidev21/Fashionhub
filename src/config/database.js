const { Client } = require('pg');

const createClient = () => {
    return new Client({
        host: 'dpg-d1ibtabipnbc73bfp1m0-a.oregon-postgres.render.com', // Reemplaza con el host de Render
        port: 5432,
        database: 'bd_fashion', // Reemplaza con el nombre de tu base de datos
        user: 'bd_fashion_user', // Reemplaza con el usuario
        password: 'WNB9OdqFI1CsSwGLFVbbYgwJWSNTVHL4', // Reemplaza con la contraseña
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    });
};

async function testConnection() {
    const client = createClient();
    try {
        await client.connect();
        console.log('✅ Conexión a PostgreSQL exitosa');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    } finally {
        await client.end();
    }
}

testConnection();

module.exports = { createClient };