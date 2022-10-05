const { productController } = require('../controllers/product.controller')
const { Router } = require('express')
const router = Router()

router.get('/Product', productController.getProduct);
router.get('/Product/:id', productController.getProduct);
router.post('/Product', productController.postProduct);
router.patch('/Product/pat/:id', productController.patchProd);

module.exports = router