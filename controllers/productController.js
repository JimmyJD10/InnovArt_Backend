const { Op } = require('sequelize');
const Product = require('../models/Product');
const User = require('../models/User');
const Resena = require('../models/Resena');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const producto = await Product.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos (incluye artesano y calificación promedio)
exports.obtenerProductos = async (req, res) => {
  try {
    const where = {};
    if (req.query.categoria) where.categoria = req.query.categoria;
    if (req.query.ubicacion) where.ubicacion = req.query.ubicacion;
    if (req.query.destacados) where.destacado = req.query.destacados === '1' || req.query.destacados === 'true';
    if (req.query.usuarioId) where.usuarioId = req.query.usuarioId;
    const products = await Product.findAll({ where, limit: 50 });

    // Calcular calificación promedio para cada producto
    const productsWithRating = await Promise.all(products.map(async (p) => {
      const resenas = await Resena.findAll({ where: { productoId: p.id } });
      let calificacion_promedio = 0;
      if (resenas.length > 0) {
        calificacion_promedio = resenas.reduce((acc, r) => acc + (r.calificacion || 0), 0) / resenas.length;
      }
      return {
        ...p.toJSON(),
        artesano: p.artesano,
        calificacion_promedio
      };
    }));

    res.json(productsWithRating);
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    const producto = await Product.findByPk(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// Buscar productos con filtros
exports.buscarProductos = async (req, res) => {
  try {
    const { q, categoria, ubicacion } = req.query;
    const where = {};

    if (q) {
      where.titulo = { [Op.like]: `%${q}%` }; // Usa 'titulo' si tu modelo lo tiene, si no, cambia por 'nombre'
    }
    if (categoria) {
      where.categoria = categoria;
    }
    if (ubicacion) {
      where.ubicacion = ubicacion;
    }

    const productos = await Product.findAll({ where, limit: 10 });
    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
