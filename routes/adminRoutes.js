const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const settingsController = require('../controllers/settingsController');
const upload = require('../upload')

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', upload.single('image'), pagesController.pages_store);
router.get('/pages/edit/:id', pagesController.pages_edit);
router.post('/pages/edit/:id', upload.array, pagesController.pages_update);
router.get('/settings', settingsController.settings_index);

module.exports = router