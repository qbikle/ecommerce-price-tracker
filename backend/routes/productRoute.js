const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProduct);
router.get('/search', productController.searchQuery);

module.exports = router;
