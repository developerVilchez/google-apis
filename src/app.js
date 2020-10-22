const express = require('express');
const app = express();

const homeRouter = require('../routes/home');
const port = 5003 || process.env.PORT;


app.use('/', homeRouter);


app.listen(port, () => {
 console.log(`Escuchando peticiones desde el puerto ${port}`)
})