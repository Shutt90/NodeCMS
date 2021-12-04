const multer = require('multer')

const fileStorage = multer.diskStorage({
    desination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname)
    }
 })

 const upload = multer({ storage: fileStorage })

 module.exports = upload;