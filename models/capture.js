const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const captureSchema = new Schema({
  img: String,
  content: String 
});

const Capture = mongoose.model('capture', captureSchema);

module.exports = Capture;