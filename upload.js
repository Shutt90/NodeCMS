const multer = require('multer')

const storage = multer.diskStorage({
    desination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.image + "-" + Date.now() + path.extname(file.originalname))
    }
 })

 module.exports = storage;