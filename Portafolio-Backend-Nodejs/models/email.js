'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Email extends Model {
    static associate(models) {
      // Aquí puedes definir las asociaciones si es necesario
    }
  }
  Email.init(
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
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true // Validación para asegurarse de que sea un correo válido
        }
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numeroTelefono: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser null si no siempre se proporciona
      },
      mensaje: {
        type: DataTypes.TEXT, // Usar TEXT para permitir mensajes más largos
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Email',
      tableName: 'Emails', // Nombre de la tabla en la base de datos
      timestamps: true // Si usas createdAt y updatedAt
    }
  );
  return Email;
};
