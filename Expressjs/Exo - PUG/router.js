const router = require('express').Router();
const ProductController = require('./product.controller');

router.get('/products', ProductController.getProducts);
router.get('/details/:id', ProductController.getProductDetail);

module.exports = router;
