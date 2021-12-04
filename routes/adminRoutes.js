const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const settingsController = require('../controllers/settingsController');
const upload = require('../upload')
// const upload = multer({'dist': '../public//uploads/'})

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', upload.array('images'), pagesController.pages_store);
router.get('/pages/edit/:id', pagesController.pages_edit);
router.post('/pages/edit/:id', upload.single('images'), pagesController.pages_update);
router.post('/pages/delete/:id', upload.none(), pagesController.pages_delete);
router.get('/settings', settingsController.settings_index);

module.exports = router