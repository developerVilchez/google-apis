const express = require('express');
const app = express();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const open = require('open');

const PORT = process.env.PORT || 8000


app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/data', (req, res) => {
  res.send('<h1>Hola desde tu data</h1>') 
})

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})




const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';


/* Carga las credenciales secretas del archivo local*/
fs.readFile('clientsecret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  //console.log(JSON.parse(content))
  authorize(JSON.parse(content), listFiles);
});


function authorize(credentials, callback) {
  //console.log('aqui', credentials.web)
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
   if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}



function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
  /*
  http://localhost:8000/data?code=4/5QG-tbDtZVHBM0XBc2JsHqTm-GSW3REhp31fj7CxMdivtJdOT4Q48Ld2wUbbn6kDrkCUD3SF_AwPTOyNl6KXVm0&scope=https://www.googleapis.com/auth/drive.metadata.readonly

  */
  console.log('Authorize this app by visiting this url:', authUrl);
 /*  console.log('Vamos a autenticarnos con google');
  (async () => {
    await open(authUrl);
  })() */


  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(auth) {
  //console.log(auth)
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    //console.log(res.data)
    const files = res.data.files;
    app.get('/files', (req, res) => {
      res.send(files)
    })
    //console.log(files)
 /*    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    } */
  });
} 


/* const app = express(); */

//miappgalerry : nombre del app
//http://localhost:8000 : inicio
//http://localhost:8000/data url redirect

/* const PORT = process.env.PORT || 3000; */

/* app.get('/', (req, res) => {
  res.send({ name: 'lulu' })
})
 */

/* app.listen(PORT, ()=> {
  console.log(`Listennig on port  ${PORT}`)
}) */