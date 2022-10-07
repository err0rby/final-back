const { Router } = require('express')
const router = Router()
const { categoryController } = require('../controllers/category.controller')

router.get('/Category', categoryController.getCategory)
router.post('/Category', categoryController.postCategory)

module.exports = router;