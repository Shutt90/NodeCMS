const express = require('express')
const router = express.Router();
const redirect = require('../redirects/404');
const systemController = require('../controllers/systemController')


router.get('/404', systemController.redirect404)

module.exports = router;