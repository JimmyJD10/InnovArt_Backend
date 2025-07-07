const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', pedidoController.buscarPedidos);
router.get('/', pedidoController.obtenerPedidos);
router.post('/',
  authMiddleware,
  body('productoId').isInt({ min: 1 }).withMessage('Producto requerido'),
  body('cantidad').isInt({ min: 1 }).withMessage('Cantidad debe ser mayor a 0'),
  pedidoController.crearPedido
);
router.put('/:id', authMiddleware, pedidoController.actualizarPedido);
router.delete('/:id', authMiddleware, pedidoController.eliminarPedido);
router.get('/:id', pedidoController.obtenerPedidoPorId);

module.exports = router;
