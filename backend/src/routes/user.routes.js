const router = require('express').Router()

const controller = require('../controllers/auth.controller.js')
const authMiddleware = require('../middleware/auth.middleware.js')

router.post('/register', controller.registerUser)
module.exports = router;

/** 
 * login
 */
router.post('/login', authMiddleware, controller.loginUser)
