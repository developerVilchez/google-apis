const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


//Set storage engine
const storage = multer.diskStorage({
  destination :  './public/uploads/',
  filename : (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


//check file type
const checkFileType = (file, cb) => {
  //crear expression para el tipo de file
  const fileType = /jpeg|jpg|png|gif/;
  //chequear extension
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  //chequear mimetype
  const mimetype = fileType.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true)
  } else {
    cb('Error : Images Only')
  }
}

//init upload
const upload = multer({
  storage : storage,
  limits : {fileSize: 1000000},
  fileFilter : (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('image')


// Init app
const app = express();

//EJE
app.set('view engine', 'ejs');

//Public folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
  //res.send('empezamos')
  res.render('index')
})

app.post('/upload', (req, res) => {
  //res.send('test')
  upload(req, res, (err) => {
    if(err) {
     res.render('index', { msg : err}) 
    } else {
      //console.log(req.file)
      //res.send('test')
      if(req.file === undefined) {
        res.render('index', {
          msg : 'Error: No file selected'
        });
      } else {
        res.render('index', {
          msg : 'file uploaded!',
          file : `uploads/${req.file.filename}`
        })
      }
    }
  })
})

const PORT = 8001 || process.env.PORT

app.listen(PORT,() => {
  console.log(`server started on port ${PORT}`)
});