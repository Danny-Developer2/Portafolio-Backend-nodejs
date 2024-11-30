const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const proyectoRoutes = require('./routes/proyectosRoutes');
const hacktheboxRoutes = require('./routes/hacktheboxRoutes');
const cors = require('cors');
const config = require('./config/config.json');

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la conexión a PostgreSQL usando Sequelize
const sequelize = new Sequelize(config.development); // Usar configuración del archivo config.json

// Sincronizar las tablas con la base de datos (no se usa `force: true` para evitar perder datos)
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
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

// Rutas
app.use('/api', emailRoutes); // Aquí definimos el prefijo '/api' para todas las rutas de email
app.use('/api', proyectoRoutes);
app.use('/api', hacktheboxRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Usar el puerto desde el archivo .env o 3000 como predeterminado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
