const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');

router.get('/dashboard', dashboardController.dashboard_index);
router.get('/pages', pagesController.pages_index);

module.exports = router