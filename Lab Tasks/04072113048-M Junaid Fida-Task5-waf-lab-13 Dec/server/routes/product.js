const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/price', productController.getProductsByPrice);
router.get('/products/expired', productController.getExpiredProducts);
router.get('/products/low-quantity', productController.getLowQuantityProducts);
router.get('/products/firm', productController.getProductsByFirm);
router.delete('/products/expired', productController.deleteExpiredProducts);
router.put('/products/price', productController.updatePriceByFirm);

module.exports = router;

