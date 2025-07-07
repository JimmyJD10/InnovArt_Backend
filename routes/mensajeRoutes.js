const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', mensajeController.buscarMensajes);
router.get('/', mensajeController.obtenerMensajes);
router.get('/:id', mensajeController.obtenerMensajePorId);

router.post('/',
  authMiddleware,
  body('contenido').notEmpty().withMessage('Mensaje requerido'),
  body('destinatarioId').isInt({ min: 1 }).withMessage('Destinatario requerido'),
  mensajeController.crearMensaje
);

router.put('/:id', authMiddleware, mensajeController.actualizarMensaje);
router.delete('/:id', authMiddleware, mensajeController.eliminarMensaje);

module.exports = router;
