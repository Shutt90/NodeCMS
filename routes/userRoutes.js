const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController');


router.get('/auth', (req, res) => {
    res.render('auth/login', {title: 'Login'});
})

router.get('/register', authController.register_index)

router.post('/register', authController.register_store)

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res) => {
    
})

module.exports = router