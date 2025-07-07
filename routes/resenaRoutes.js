const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reseñaController = require('../controllers/reseñaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', reseñaController.buscarReseñas);
router.get('/', reseñaController.obtenerReseñas);
router.post('/',
  authMiddleware,
  body('comentario').notEmpty().withMessage('Comentario requerido'),
  body('calificacion').isInt({ min: 1, max: 5 }).withMessage('Calificación entre 1 y 5'),
  reseñaController.crearReseña
);
router.put('/:id', authMiddleware, reseñaController.actualizarReseña);
router.delete('/:id', authMiddleware, reseñaController.eliminarReseña);
router.get('/:id', reseñaController.obtenerReseñaPorId);

module.exports = router;
