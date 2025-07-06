const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Buscar productos con filtros
router.get('/search', productController.buscarProductos);

// Obtener todos los productos
router.get('/', productController.obtenerProductos);

// Obtener producto por ID
router.get('/:id', productController.obtenerProductoPorId);

// Crear producto (protegido)
router.post('/', authMiddleware, productController.crearProducto);

// Actualizar producto (protegido)
router.put('/:id', authMiddleware, productController.actualizarProducto);

// Eliminar producto (protegido)
router.delete('/:id', authMiddleware, productController.eliminarProducto);

module.exports = router;
