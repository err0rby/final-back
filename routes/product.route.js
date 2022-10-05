const { productController } = require('../controllers/product.controller')
const { Router } = require('express')
const router = Router()

router.get('/Product', productController.getProduct)
router.get('/Product/:id', productController.getProductId)
router.post('/Product', productController.postProduct)

module.exports = router