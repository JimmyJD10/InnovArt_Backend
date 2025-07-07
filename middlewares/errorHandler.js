module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    ok: false,
    mensaje: err.message || 'Error interno del servidor',
    detalles: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
