const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mensaje = sequelize.define('Mensaje', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  remitenteId: { type: DataTypes.INTEGER, allowNull: false },
  destinatarioId: { type: DataTypes.INTEGER, allowNull: false },
  contenido: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'mensajes',
  timestamps: false
});

module.exports = Mensaje;
