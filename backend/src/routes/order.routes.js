const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = require('express').Router();

router.post('/orders', authMiddleware, orderController.placeOrder);
router.get('/orders', authMiddleware, orderController.OrderHistory);

module.exports = router;