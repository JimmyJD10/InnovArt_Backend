const express = require('express');
const router = express.Router();
const reseñaController = require('../controllers/reseñaController');

router.get('/', reseñaController.obtenerReseñas);

module.exports = router;
router.get('/', reseñaController.obtenerReseñas);
router.get('/:id', reseñaController.obtenerReseñaPorId);

router.post('/',
  authMiddleware,
  body('comentario').notEmpty().withMessage('Comentario requerido'),
  body('calificacion').isInt({ min: 1, max: 5 }).withMessage('Calificación entre 1 y 5'),
  reseñaController.crearReseña
);

router.put('/:id', authMiddleware, reseñaController.actualizarReseña);
router.delete('/:id', authMiddleware, reseñaController.eliminarReseña);

module.exports = router;
