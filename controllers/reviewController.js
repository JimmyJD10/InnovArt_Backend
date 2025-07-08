const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

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

    // Recalcular promedio y total de reseñas del producto
    const reviewsProducto = await Review.findAll({ where: { productoId } });
    const totalProducto = reviewsProducto.length;
    const promedioProducto = totalProducto > 0 ? (reviewsProducto.reduce((acc, r) => acc + r.calificacion, 0) / totalProducto) : 0;
    await Product.update(
      { calificacion_promedio: promedioProducto, total_reseñas: totalProducto },
      { where: { id: productoId } }
    );

    // Recalcular promedio y total de reseñas del artesano
    const reviewsArtesano = await Review.findAll({ where: { artesanoId } });
    const totalArtesano = reviewsArtesano.length;
    const promedioArtesano = totalArtesano > 0 ? (reviewsArtesano.reduce((acc, r) => acc + r.calificacion, 0) / totalArtesano) : 0;
    await User.update(
      { calificacion_promedio: promedioArtesano, total_reseñas: totalArtesano },
      { where: { id: artesanoId } }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear review' });
  }
};
