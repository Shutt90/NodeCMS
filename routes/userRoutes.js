const authController = require('../controllers/authController');
const router = express.Router();

router.get('/auth', (req, res) => {
    res.render('auth/login', {title: 'Login'});
})

router.get('/register', authController.register_index)

router.post('/register', (req, res) => {

})

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res) => {
    
})

module.exports = router