'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env] || require(__dirname + '/../config/config.json')['development'];
console.log(config);

const db = {};

console.log(config.database);  // Para verificar que la configuración se está cargando correctamente

let sequelize;

// Si no usas variables de entorno, simplemente conecta con la configuración del archivo JSON
sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  ssl: config.ssl ? { rejectUnauthorized: false } : false,  // Asegúrate de que 'ssl' esté configurado correctamente en tu config.json
});

// Verificar la conexión con la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
