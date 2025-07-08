const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Buscar productos con filtros
router.get('/search', productController.buscarProductos);

// Obtener todos los productos (con filtros por query)
router.get('/', productController.obtenerProductos);

// Obtener producto por ID
router.get('/:id', productController.obtenerProductoPorId);

// Crear producto (protegido)
router.post('/',
  authMiddleware,
  upload.array('imagenes', 5),
  body('titulo').notEmpty().withMessage('Título requerido'),
  body('precio').isFloat({ gt: 0 }).withMessage('Precio debe ser mayor a 0'),
  productController.crearProducto
);

// Actualizar producto (protegido)
router.put('/:id', authMiddleware, upload.array('imagenes', 5), productController.actualizarProducto);

// Eliminar producto (protegido)
router.delete('/:id', authMiddleware, productController.eliminarProducto);

module.exports = router;
