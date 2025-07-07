const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reseña = sequelize.define('Reseña', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  comentario: { type: DataTypes.TEXT, allowNull: false },
  calificacion: { type: DataTypes.INTEGER, allowNull: false },
  clienteId: { type: DataTypes.INTEGER, allowNull: false },
  artesanoId: { type: DataTypes.INTEGER, allowNull: false },
  productoId: { type: DataTypes.INTEGER },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reseñas',
  timestamps: false
});

module.exports = Reseña;
module.exports = Reseña;
