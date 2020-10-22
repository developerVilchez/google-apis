const express = require('express');
const app = express();
const path = require('path');
//Rutas
const homeRouter = require('./routes/home');
const uploadRouter = require('./routes/upload');


//settings
app.set('view engine', 'ejs');
app.set('port', 5003);
app.set('views', path.join(__dirname, 'views'))

//traemos las rutas
app.use('/', homeRouter);
app.use('/upload',uploadRouter);

const port = app.get('port');

app.listen(port, () => {
 console.log(`Escuchando peticiones desde el puerto ${port}`)
})