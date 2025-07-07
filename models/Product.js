const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.FLOAT,
  imagen: DataTypes.STRING,
  categoria: DataTypes.STRING,
  ubicacion: DataTypes.STRING,
  usuarioId: DataTypes.INTEGER,
  destacado: DataTypes.BOOLEAN,
  stock: DataTypes.INTEGER,
  fecha_publicacion: DataTypes.DATE
}, {
  tableName: 'productos',
  timestamps: false
});

// Relación correcta
Product.belongsTo(User, { as: 'artesano', foreignKey: 'usuarioId' });

// Si tienes algún campo anio/anios, cámbialo por año/años

module.exports = Product;
