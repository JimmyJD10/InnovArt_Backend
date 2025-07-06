const Resena = require('../models/Resena');

exports.crearResena = async (req, res) => {
  res.json({ mensaje: 'Reseña creada (implementa la lógica)' });
};

exports.obtenerResenas = async (req, res) => {
  res.json([]);
};

exports.obtenerResenaPorId = async (req, res) => {
  res.json({});
};

exports.actualizarResena = async (req, res) => {
  res.json({ mensaje: 'Reseña actualizada (implementa la lógica)' });
};

exports.eliminarResena = async (req, res) => {
  res.json({ mensaje: 'Reseña eliminada (implementa la lógica)' });
};

exports.buscarResenas = async (req, res) => {
  res.json([]);
};
    // Incluye productoId y artesanoId en la respuesta
    res.json(resenas.map(r => ({
      ...r.toJSON(),
      productoId: r.productoId,
      artesanoId: r.artesanoId
    })));
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas' });
  }
};

exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findByPk(req.params.id);
    if (!resena) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.status(200).json(resena);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarResena = async (req, res) => {
  try {
    const [updated] = await Resena.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    const resena = await Resena.findByPk(req.params.id);
    res.status(200).json(resena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarResena = async (req, res) => {
  try {
    const deleted = await Resena.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.status(200).json({ mensaje: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
