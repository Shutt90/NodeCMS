const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const newsController = require('../controllers/newsController');
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
router.post('/pages/deleteall', pagesController.pages_deleteAll)
router.get('/news', upload.none(), newsController.news_index);
router.post('/news/create', upload.array('images'), newsController.news_store);
router.get('/news/edit/:id', newsController.news_edit);
router.post('/news/edit/:id', upload.single('images'), newsController.news_update);
router.post('/news/delete/:id', upload.none(), newsController.news_delete);

router.get('/settings', settingsController.settings_index);

module.exports = router