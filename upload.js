const multer = require('multer')

const storage = multer.diskStorage({
    desination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname)
    }
 })

 const upload = multer({ storage: fileStorageEngine})

 module.exports = storage;