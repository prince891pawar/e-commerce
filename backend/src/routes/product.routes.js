const router = require('express').Router()

const controller = require('../controllers/product.controller.js')
router.post('/products', controller.createProduct)
module.exports = router;