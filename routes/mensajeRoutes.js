const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', mensajeController.buscarMensajes);
router.get('/', mensajeController.obtenerMensajes);
router.post('/', authMiddleware, mensajeController.crearMensaje);
router.put('/:id', authMiddleware, mensajeController.actualizarMensaje);
router.delete('/:id', authMiddleware, mensajeController.eliminarMensaje);
router.get('/:id', mensajeController.obtenerMensajePorId);

module.exports = router;
