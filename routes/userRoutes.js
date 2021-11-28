const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/register', authController.register_index)

router.post('/register', authController.register_store)

router.get('/login', authController.login_index)

router.post('/login', authController.login_auth)

router.get('/register-verify', authController.send_verification)

// router.get('/logout', authControll.login_auth)

module.exports = router