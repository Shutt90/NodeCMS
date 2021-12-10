const multer = require('multer')

const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
  },

    filename: function(req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname)
    }

 })

 const sliderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/sliders/')
  },

  filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }

})

 const imagesUpload = multer({ storage: imagesStorage })
 const sliderUpload = multer({ storage: sliderStorage })

module.exports = {
   imagesUpload,
   sliderUpload,
}