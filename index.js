const express = require('express');
const app = express();
const path = require('path');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

//Iniciamos un cliente con google-cloud-storage
const storage = new Storage({ keyFilename : "keys.json", projectId : process.env.GOOGLE_CLOUD_PROJECT});

const clientVision = new vision.ImageAnnotatorClient({
  keyFile : 'keys.json',
  projectId : process.env.GOOGLE_APPLICATION_CREDENTIALS
});
const bucketName = 'pictures-awesome-lulu-flow';
const bucket = storage.bucket(bucketName);

//console.log(clientVision);
//console.log(bucket)

//Seteando middlewares
app.set('view engine', 'ejs')

//Configurando Multer

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

//helper
const getPublicUrl  = (filename, CLOUD_BUCKET) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

//Middleware
const sendUploadToGCP = (req, res, next) => {
  //console.log('entre middleware',req.file)
  if(!req.file) {
    return next('no hay nada');
  }

  const gcsname = Date.now() + '_' + req.file.originalname;
  const file = bucket.file(gcsname);
  //console.log(file);
  const stream = file.createWriteStream({
    metadata : {
      contentType : req.file.mimetype
    }
  });
  stream.on('error' , (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname,bucketName)
      next();
    });
  });

  stream.end(req.file.buffer)
}



//Manejador de rutas
app.get('/', (req, res) => {
  res.render('form')
})

app.post('/upload', multer.single('image'), sendUploadToGCP, (req, res, next) => {
  //console.log('entre 2', req.file)
  //console.log(req.body)
  const data = req.body;
  //Si la imagen ya está en el storage de google
  if(req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
    //res.redirect('/capture');
    clientVision.textDetection(data.imageUrl)
    .then(results => { 
       data.text = results[0].textAnnotations[0].description 
      //console.log(results[0].textAnnotations[0].description)
      res.render('capture', {
        src : data.imageUrl,
        text : data.text
      })
    })
    .catch(err => console.error('ERROR', err))
   
  }
})



//Establecemos el canal por donde nos comunicaremos con el cliente
const port = 8282 || process.env.PORT
app.listen(port, () => {
  console.log(`Èstablecemos este puerto para recibir peticiones y enviar respuestas ${port}`)
})