const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');



// Init app
const app = express();

app.get('/', (req, res) => {
  res.send('empezamos')
})


const PORT = 8001 || process.env.PORT

app.listen(PORT,() => {
  console.log(`server started on port ${PORT}`)
});