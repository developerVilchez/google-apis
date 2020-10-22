const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');
const uploadRouter = require('./routes/upload');
//settings
app.set('view engine', 'ejs');
app.set('port', 5003);
app.set('views', path.join(__dirname, 'views'))

//muestra el path del archivo app.js
//console.log(__dirname) 
console.log(path.join(__dirname, 'views'))


//const port = 5003 || process.env.PORT;


//traemos las rutas
app.use('/', homeRouter);
app.use('/upload',uploadRouter);

const port = app.get('port');
console.log(port)


app.listen(port, () => {
 console.log(`Escuchando peticiones desde el puerto ${port}`)
})