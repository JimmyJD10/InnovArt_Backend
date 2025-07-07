const { Op } = require('sequelize');
const Reseña = require('../models/Reseña');

exports.crearReseña = async (req, res) => {
  try {
    const reseña = await Reseña.create(req.body);
    res.status(201).json(reseña);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
};

exports.obtenerReseñas = async (req, res) => {
  try {
    const where = {};
    if (req.query.clienteId) where.clienteId = req.query.clienteId;
    if (req.query.artesanoId) where.artesanoId = req.query.artesanoId;
    if (req.query.productoId) where.productoId = req.query.productoId;
    if (req.query.destacadas)
      where.destacada =
        req.query.destacadas === '1' || req.query.destacadas === 'true';

    const reseñas = await Reseña.findAll({ where });
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

exports.obtenerReseñaPorId = async (req, res) => {
  try {
    const reseña = await Reseña.findByPk(req.params.id);
    if (!reseña)
      return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(reseña);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseña' });
  }
};

exports.actualizarReseña = async (req, res) => {
  try {
    await Reseña.update(req.body, { where: { id: req.params.id } });
    const reseña = await Reseña.findByPk(req.params.id);
    res.json(reseña);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reseña' });
  }
};

exports.eliminarReseña = async (req, res) => {
  try {
    await Reseña.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Reseña eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
};

exports.buscarReseñas = async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.comentario = { [Op.like]: `%${q}%` };
    }

    const reseñas = await Reseña.findAll({ where, limit: 10 });
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar reseñas' });
  }
};