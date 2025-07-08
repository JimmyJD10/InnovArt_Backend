const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', reviewController.obtenerReviews);
router.post('/', authMiddleware, reviewController.crearReview);

module.exports = router;
