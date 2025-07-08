const Review = require('../models/Review');

exports.obtenerReviews = async (req, res) => {
  try {
    const where = {};
    if (req.query.productoId) where.productoId = req.query.productoId;
    if (req.query.artesanoId) where.artesanoId = req.query.artesanoId;
    if (req.query.clienteId) where.clienteId = req.query.clienteId;
    const reviews = await Review.findAll({ where });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reviews' });
  }
};

exports.crearReview = async (req, res) => {
  try {
    const { productoId, artesanoId, clienteId, calificacion, comentario } = req.body;
    if (!productoId || !artesanoId || !clienteId || !calificacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const review = await Review.create({ productoId, artesanoId, clienteId, calificacion, comentario });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear review' });
  }
};
