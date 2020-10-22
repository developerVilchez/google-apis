const route = require('express').Router();
const upload = require('../middleware/multer');
const path = require('path');


route.post('/', upload, (req, res) => {
  upload(req, res, (err) => {
    if(err) return res.render('home', {msg : err, file : ''});
    if(!req.file) return res.render('home', {msg: 'Error: No ha seleccionado file', file :''});
    res.render('home', {
      msg : 'imagen subida',
      file : 'uploads/'+req.file.filename
    })
  })
})


module.exports = route;