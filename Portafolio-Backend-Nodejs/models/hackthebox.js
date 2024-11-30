'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Hackthebox extends Model {
    static associate(models) {
      // Aquí puedes definir las asociaciones si las necesitas
    }
  }
  Hackthebox.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que no sea null
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT, // Usar TEXT para descripciones más largas
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser null si no siempre tiene imagen
      },
      linkCertificado: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Hackthebox',
      tableName: 'Hacktheboxes', // Nombre de la tabla en la base de datos
      timestamps: true // Si usas createdAt y updatedAt
    }
  );
  return Hackthebox;
};
