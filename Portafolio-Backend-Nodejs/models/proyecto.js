'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Proyecto extends Model {
    static associate(models) {
      // Aquí puedes definir las asociaciones si las necesitas
    }
  }
  Proyecto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que no sea null
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.STRING, // Podrías considerar usar DataTypes.DATE si es una fecha real
        allowNull: false
      },
      repository: {
        type: DataTypes.STRING,
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser null si no siempre tiene imagen
      }
    },
    {
      sequelize,
      modelName: 'Proyecto',
      tableName: 'Proyectos', // Nombre de la tabla en la BD
      timestamps: true // Si usas createdAt y updatedAt
    }
  );
  return Proyecto;
};
