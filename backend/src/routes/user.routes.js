const router = require('express').Router()

const controller = require('../controllers/auth.controller.js')


router.post('/register', controller.registerUser)
module.exports = router;

/** 
 * login
 */
router.post('/login',controller.loginUser)

/** 
 * logout
 */
router.post('/logout', controller.LogoutUser)