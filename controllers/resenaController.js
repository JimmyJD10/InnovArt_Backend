const { Op } = require('sequelize'); // ✅ Importa Op de Sequelize
const Resena = require('../models/Resena');

exports.crearResena = async (req, res) => {
  try {
    const resena = await Resena.create(req.body);
    res.status(201).json(resena);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
};

exports.obtenerResenas = async (req, res) => {
  try {
    const where = {};
    if (req.query.clienteId) where.clienteId = req.query.clienteId;
    if (req.query.artesanoId) where.artesanoId = req.query.artesanoId;
    if (req.query.productoId) where.productoId = req.query.productoId;
    if (req.query.destacadas)
      where.destacada =
        req.query.destacadas === '1' || req.query.destacadas === 'true';

    const resenas = await Resena.findAll({ where });
    res.json(resenas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id);
    if (!resena)
      return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(resena);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseña' });
  }
};

exports.actualizarResena = async (req, res) => {
  try {
    await Resena.update(req.body, { where: { id: req.params.id } });
    const resena = await Resena.findByPk(req.params.id);
    res.json(resena);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reseña' });
  }
};

exports.eliminarResena = async (req, res) => {
  try {
    await Resena.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Reseña eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
};

exports.buscarResenas = async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.comentario = { [Op.like]: `%${q}%` }; // ✅ Operador correcto
    }

    const resenas = await Resena.findAll({ where, limit: 10 });
    res.json(resenas);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar reseñas' });
  }
};
