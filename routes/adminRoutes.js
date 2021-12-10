const express = require('express')
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const pagesController = require('../controllers/pagesController');
const newsController = require('../controllers/newsController');
const slidersController = require('../controllers/slidersController');
const settingsController = require('../controllers/settingsController');
const permissions = require('../middleware/permissions');
const uploadPath = require('../upload')

router.get('/dashboard', dashboardController.dashboard_index);

router.get('/pages', pagesController.pages_index);
router.get('/pages/create', pagesController.pages_create)
router.post('/pages/create', uploadPath.imagesUpload.array('images', 10), pagesController.pages_store);
router.get('/pages/edit/:id', pagesController.pages_edit);
router.post('/pages/edit/:id', uploadPath.imagesUpload.array('images', 10), pagesController.pages_update);
router.post('/pages/delete/:id', uploadPath.imagesUpload.none(), pagesController.pages_delete);
router.post('/pages/deleteall', pagesController.pages_deleteAll);
router.post('/pages/seed', pagesController.pages_seed);

router.get('/news', newsController.news_index);
router.get('/news/create', newsController.news_create);
router.post('/news/create', uploadPath.imagesUpload.single('images', 10), newsController.news_store);
router.get('/news/edit/:id', newsController.news_edit);
router.post('/news/edit/:id', uploadPath.imagesUpload.single('images', 10), newsController.news_update);
router.post('/news/delete/:id', uploadPath.imagesUpload.none(), newsController.news_delete);

router.get('/sliders', slidersController.sliders_index);
router.get('/sliders/create', uploadPath.sliderUpload.none(), slidersController.sliders_create);
router.post('/sliders/create', uploadPath.sliderUpload.array('file', 10), slidersController.sliders_store);

router.get('/settings', settingsController.settings_index);

module.exports = router