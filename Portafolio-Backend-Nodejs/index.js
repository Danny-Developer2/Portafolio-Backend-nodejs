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
        url: 'portafolio-backend-nodejs-production.up.railway.app/api', // URL base de la API
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

// Simulación de una respuesta 404
app.get('/api/buggy/not-found', (req, res) => {
  res.status(404).json({ message: 'El recurso solicitado no existe.' });
});

// Simulación de una respuesta 500 (error en el servidor)
app.get('/api/buggy/server-error', (req, res) => {
  throw new Error('Simulación de un error en el servidor.');
});

// Simulación de una respuesta 400 (mala solicitud)
app.get('/api/buggy/bad-request', (req, res) => {
  res.status(400).json({ message: 'Solicitud incorrecta.' });
});

// Middleware de manejo de errores para el error 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Usar el puerto desde el archivo .env o 3000 como predeterminado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
