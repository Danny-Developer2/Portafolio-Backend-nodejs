const express = require('express');
const { Pool } = require('pg'); // Cliente de PostgreSQL
require('dotenv').config();
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { sequelize } = require('./models');
const proyectoRoutes = require('./routes/proyectosRoutes');
const hacktheboxRoutes = require('./routes/hacktheboxRoutes');
const cors = require('cors'); 

const app = express();
app.use(express.json());


sequelize.sync({ force: false }) // Esto borrará las tablas existentes y las recreará
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });
// Habilitar CORS para todas las solicitudes
app.use(cors());

// Configurar la conexión a PostgreSQL
// Configurar la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT, // Generalmente 5432 para PostgreSQL
    ssl: {
      rejectUnauthorized: false, // Asegúrate de agregar esta opción si usas SSL en Railway
    },
  });

  sequelize.sync({ force: false })  // Si pones `force: true`, borrará las tablas existentes
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

  
  // Conexión con la base de datos
  pool.connect((err) => {
    if (err) {
      console.error('Error conectando a PostgreSQL:', err.stack);
    } else {
      console.log('Conectado a PostgreSQL');
    }
  });
// Configuración de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // Versión de OpenAPI (Swagger)
      info: {
        title: 'API de Email',
        version: '1.0.0',
        description: 'API para gestionar emails',
      },
      servers: [
        {
          url: 'http://localhost:3000/api', // URL base de la API
        },
      ],
    },
    apis: ['./routes/*.js'], // Ruta donde se encuentran los archivos de rutas (comentarios JSDoc)
  };
  
  // Generar especificaciones Swagger
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  // Servir la documentación Swagger en la ruta /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Crear una ruta para obtener datos de la base de datos
// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas
app.use('/api', emailRoutes); // Aquí definimos el prefijo '/api' para todas las rutas de email
app.use('/api', proyectoRoutes);
app.use('/api', hacktheboxRoutes);


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
