const express = require('express');
const router = express.Router();
const reseñaController = require('../controllers/reseñaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', reseñaController.buscarReseñas);
router.get('/', reseñaController.obtenerReseñas);
router.post('/', authMiddleware, reseñaController.crearReseña);
router.put('/:id', authMiddleware, reseñaController.actualizarReseña);
router.delete('/:id', authMiddleware, reseñaController.eliminarReseña);
router.get('/:id', reseñaController.obtenerReseñaPorId);

module.exports = router;
