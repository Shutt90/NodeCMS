const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const newsController = require('../controllers/newsController');
const slidersController = require('../controllers/slidersController');
const settingsController = require('../controllers/settingsController');
const upload = require('../upload')

// const upload = multer({'dist': '../public//uploads/'})

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', upload.array('images'), pagesController.pages_store);
router.get('/pages/edit/:id', pagesController.pages_edit);
router.post('/pages/edit/:id', upload.array('images'), pagesController.pages_update);
router.post('/pages/delete/:id', upload.none(), pagesController.pages_delete);
router.post('/pages/deleteall', pagesController.pages_deleteAll);
router.post('/pages/seed', pagesController.pages_seed);

router.get('/news', newsController.news_index);
router.get('/news/create', newsController.news_create);
router.post('/news/create', upload.single('images'), newsController.news_store);
router.get('/news/edit/:id', newsController.news_edit);
router.post('/news/edit/:id', upload.single('images'), newsController.news_update);
router.post('/news/delete/:id', upload.none(), newsController.news_delete);

router.get('/sliders', slidersController.sliders_index);

router.get('/settings', settingsController.settings_index);

module.exports = router