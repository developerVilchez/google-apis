const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');



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


const PORT = 8001 || process.env.PORT

app.listen(PORT,() => {
  console.log(`server started on port ${PORT}`)
});