const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home_index)
router.get('/page/:title', homeController.home_dynamic)

module.exports = router;