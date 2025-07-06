const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', pedidoController.buscarPedidos);
router.get('/', pedidoController.obtenerPedidos);
router.post('/', authMiddleware, pedidoController.crearPedido);
router.put('/:id', authMiddleware, pedidoController.actualizarPedido);
router.delete('/:id', authMiddleware, pedidoController.eliminarPedido);
router.get('/:id', pedidoController.obtenerPedidoPorId);

module.exports = router;
