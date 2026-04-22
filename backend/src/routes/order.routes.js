const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware'); 
const router = require('express').Router();

router.post('/orders', authMiddleware, orderController.placeOrder);
router.get('/orders', authMiddleware, orderController.OrderHistory);
router.get('/admin/orders',authMiddleware,adminMiddleware,orderController.getAllOrders);
router.put('/admin/orders/:id', authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.get("/orders/my", authMiddleware, orderController.getUserOrders);

module.exports = router;