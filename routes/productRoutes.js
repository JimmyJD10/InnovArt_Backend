const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', productController.buscarProductos);
router.get('/', productController.obtenerProductos);
router.post('/', authMiddleware, productController.crearProducto);
router.put('/:id', authMiddleware, productController.actualizarProducto);
router.delete('/:id', authMiddleware, productController.eliminarProducto);
router.get('/:id', productController.obtenerProductoPorId);

module.exports = router;
  const where = {};
  if (q) {
    where.nombre = { [require('sequelize').Op.like]: `%${q}%` };
  }
  if (categoria) {
    where.categoria = categoria;
  }
  if (ubicacion) {
    where.ubicacion = ubicacion;
  }
  const productos = await require('../models/Product').findAll({ where, limit: 10 });
  res.json(productos);
});

module.exports = router;
