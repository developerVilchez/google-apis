const router = require('./home');

const route = require('express').Router();

route.post('/', (req, res) => {
  console.log(req.file)
  res.send('proceso de carga de imagenes')
})


module.exports = route;