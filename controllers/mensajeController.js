const Mensaje = require('../models/Mensaje');
const { Op } = require('sequelize');

exports.obtenerMensajes = async (req, res) => {
  try {
    const where = {};
    if (req.query.remitenteId) where.remitenteId = req.query.remitenteId;
    if (req.query.destinatarioId) where.destinatarioId = req.query.destinatarioId;
    const mensajes = await Mensaje.findAll({ where });
    res.json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes', detalle: error.message });
  }
};

exports.obtenerMensajePorId = async (req, res) => {
  try {
    const mensaje = await Mensaje.findByPk(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensaje' });
  }
};

exports.crearMensaje = async (req, res) => {
  try {
    const { remitenteId, destinatarioId, contenido } = req.body;
    // Log para depuración
    console.log('Crear mensaje:', { remitenteId, destinatarioId, contenido });
    if (!remitenteId || !destinatarioId) {
      return res.status(400).json({ error: 'remitenteId y destinatarioId son requeridos' });
    }
    if (!contenido || typeof contenido !== 'string' || !contenido.trim()) {
      return res.status(400).json({ error: 'El contenido del mensaje es requerido' });
    }
    const mensaje = await Mensaje.create({ remitenteId, destinatarioId, contenido });
    res.status(201).json(mensaje);
  } catch (error) {
    console.error('Error al crear mensaje:', error);
    res.status(500).json({ error: error.message || 'Error al crear mensaje' });
  }
};

exports.actualizarMensaje = async (req, res) => {
  try {
    await Mensaje.update(req.body, { where: { id: req.params.id } });
    const mensaje = await Mensaje.findByPk(req.params.id);
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mensaje' });
  }
};

exports.eliminarMensaje = async (req, res) => {
  try {
    await Mensaje.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Mensaje eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
};

exports.buscarMensajes = async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.contenido = { [Op.like]: `%${q}%` };
    }
    const mensajes = await Mensaje.findAll({ where, limit: 10 });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar mensajes' });
  }
};
