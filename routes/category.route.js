const { categoryController } = require('../controllers/category.controller')
const { Router } = require('express')
const router = Router()

router.get('/Category', categoryController.getCategory)
router.post('/Category', categoryController.postCategory)

module.exports = router