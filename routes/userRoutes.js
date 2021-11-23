const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
    res.render('register');
})

router.get('/register', (req, res) => {
    res.render('views/auth/register')
})

router.post('/register', (req, res) => {

})

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res) => {
    
})

module.exports = router