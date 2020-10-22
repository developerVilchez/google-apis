const multer = require('multer');
const path = require('path');

//definimos como quiero que guarde la data multer

const storage = multer.diskStorage({
  destination :  './public/uploads/',
  filename : (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

//middlewares
const upload = multer({
  storage
}).single('image')


module.exports = upload
