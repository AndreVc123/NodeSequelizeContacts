'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contactos.belongsTo(models.usuario, {
        as: 'usuario',
        foreignKey: 'idUsuario'
      })
    }
  };
  contactos.init({
    idUsuario: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'contactos',
  });
  return contactos;
};