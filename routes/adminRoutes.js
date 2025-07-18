const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const reviewController = require('../controllers/reviewController');

router.get('/summary', authMiddleware, adminMiddleware, adminController.getSummary);

module.exports = router;
