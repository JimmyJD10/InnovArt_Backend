const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productoId: { type: DataTypes.INTEGER, allowNull: false },
  artesanoId: { type: DataTypes.INTEGER, allowNull: false },
  clienteId: { type: DataTypes.INTEGER, allowNull: false },
  calificacion: { type: DataTypes.INTEGER, allowNull: false },
  comentario: { type: DataTypes.TEXT, allowNull: true },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reviews',
  timestamps: false
});

module.exports = Review;
