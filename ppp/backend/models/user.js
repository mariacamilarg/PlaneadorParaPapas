const mongoose = require('../db');
var Schema = mongoose.Schema;

// create a schema - obtained from https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
});

var User = mongoose.model('User', userSchema);

User.find({}, function(err, users) {
  if (err) throw err;
  
});

module.exports = User;