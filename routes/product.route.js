const { Router } = require('express')
const router = Router()
const { productController } = require('../controllers/product.controller')

router.get('/Product', productController.getProduct);
router.get('/Product/:id', productController.getProduct);
router.post('/Product', productController.postProduct);
router.patch('/Product/pat/:id', productController.patchProd);
router.patch('/Product/arr/:id', productController.pushUser);

module.exports = router;