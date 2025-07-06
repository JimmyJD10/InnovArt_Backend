const Mensaje = require('../models/Mensaje');

exports.crearMensaje = async (req, res) => {
  res.json({ mensaje: 'Mensaje creado (implementa la lógica)' });
};

exports.obtenerMensajes = async (req, res) => {
  res.json([]);
};

exports.actualizarMensaje = async (req, res) => {
  res.json({ mensaje: 'Mensaje actualizado (implementa la lógica)' });
};

exports.eliminarMensaje = async (req, res) => {
  res.json({ mensaje: 'Mensaje eliminado (implementa la lógica)' });
};

exports.obtenerMensajePorId = async (req, res) => {
  res.json({});
};

exports.buscarMensajes = async (req, res) => {
  res.json([]);
};
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarMensaje = async (req, res) => {
  try {
    const deleted = await Mensaje.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
    res.status(200).json({ mensaje: 'Mensaje eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
