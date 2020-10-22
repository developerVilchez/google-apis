const route = require('express').Router();
const upload = require('../middleware/multer');

route.post('/', upload, (req, res) => {
  console.log(req.file)
  res.send('proceso de carga de imagenes')
})


module.exports = route;