var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('MONGOLAB_URI');

module.exports = mongoose;