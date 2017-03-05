var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://camendoza94:Web-20171@ds119020.mlab.com:19020/heroku_5skczfp8'); //TO_DO

module.exports = mongoose;