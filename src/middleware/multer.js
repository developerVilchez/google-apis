const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  destination :  path.join(path.dirname(__dirname), 'public/uploads'),
  filename : (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

//middlewares
const upload = multer({
  storage
}).single('image')


module.exports = upload
