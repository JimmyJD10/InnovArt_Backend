const Mensaje = require('../models/Mensaje');

exports.obtenerMensajes = async (req, res) => {
  try {
    const where = {};
    if (req.query.remitenteId) where.remitenteId = req.query.remitenteId;
    if (req.query.destinatarioId) where.destinatarioId = req.query.destinatarioId;
    const mensajes = await Mensaje.findAll({ where });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
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
    const mensaje = await Mensaje.create(req.body);
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear mensaje' });
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
      where.contenido = { $like: `%${q}%` };
    }
    const mensajes = await Mensaje.findAll({ where, limit: 10 });
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar mensajes' });
  }
};
