const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', pagesController.pages_store);

module.exports = router