var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ppp'); //TO_DO

module.exports = mongoose;