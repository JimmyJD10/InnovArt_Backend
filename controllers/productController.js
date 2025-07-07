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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const where = {};
    if (req.query.categoria) where.categoria = req.query.categoria;
    if (req.query.ubicacion) where.ubicacion = req.query.ubicacion;
    if (req.query.destacados) where.destacado = req.query.destacados === '1' || req.query.destacados === 'true';
    if (req.query.usuarioId) where.usuarioId = req.query.usuarioId;
    const productos = await Product.findAll({
      where,
      limit,
      offset,
      include: [{ model: User, as: 'artesano', attributes: ['id', 'nombre_completo', 'ciudad'] }]
    });

    // Calcular calificación promedio para cada producto
    const productsWithRating = await Promise.all(productos.map(async (p) => {
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

    res.json({
      ok: true,
      datos: productsWithRating,
      mensaje: 'Productos obtenidos'
    });
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id); mensaje: 'Producto no encontrado' });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });= 'admin' && req.user.id !== producto.usuarioId) {
    res.json(producto);atus(403).json({ ok: false, mensaje: 'No autorizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' }); await Product.update(req.body, { where: { id: req.params.id } });
  }  res.json(producto);
};  } catch (error) {
json({ error: 'Error al actualizar producto' });
// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    const producto = await Product.findByPk(req.params.id);ducto = async (req, res) => {
    res.json(producto);
  } catch (error) { const producto = await Product.findByPk(req.params.id);
    res.status(500).json({ error: 'Error al actualizar producto' });  if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
  }    if (req.user.rol !== 'admin' && req.user.id !== producto.usuarioId) {
};on({ ok: false, mensaje: 'No autorizado' });

// Eliminar productoit Product.destroy({ where: { id: req.params.id } });
exports.eliminarProducto = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });    res.status(500).json({ error: 'Error al eliminar producto' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }con filtros
};eq, res) => {
 {
// Buscar productos con filtrosoria, ubicacion } = req.query;
exports.buscarProductos = async (req, res) => {
  try {
    const { q, categoria, ubicacion } = req.query;    if (q) {
    const where = {};u modelo lo tiene, si no, cambia por 'nombre'

    if (q) {{
      where.titulo = { [Op.like]: `%${q}%` }; // Usa 'titulo' si tu modelo lo tiene, si no, cambia por 'nombre'
    }
    if (categoria) { if (ubicacion) {
      where.categoria = categoria;    where.ubicacion = ubicacion;
    }    }












};  }    res.status(500).json({ error: 'Error interno del servidor' });    console.error('Error al buscar productos:', error);  } catch (error) {    res.json(productos);    const productos = await Product.findAll({ where, limit: 10 });    }      where.ubicacion = ubicacion;    if (ubicacion) {
    const productos = await Product.findAll({ where, limit: 10 });
    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
