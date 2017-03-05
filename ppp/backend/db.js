var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('MONGOLAB_URI'); //TO_DO

module.exports = mongoose;