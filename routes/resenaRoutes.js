const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', resenaController.buscarResenas);
router.get('/', resenaController.obtenerResenas);
router.post('/', authMiddleware, resenaController.crearResena);
router.put('/:id', authMiddleware, resenaController.actualizarResena);
router.delete('/:id', authMiddleware, resenaController.eliminarResena);
router.get('/:id', resenaController.obtenerResenaPorId);

module.exports = router;
