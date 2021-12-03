const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const settingsController = require('../controllers/settingsController');

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', pagesController.pages_store);
router.get('/pages/edit/:id', pagesController.pages_edit);
router.post('/pages/edit/:id', pagesController.pages_update);
router.get('/settings', settingsController.settings_index);

module.exports = router