const mongoose = require('../db');
var Schema = mongoose.Schema;

// create a schema - obtained from https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String
});

var User = mongoose.model('User', userSchema);

User.add(function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.password = req.body.password;
  user.location = req.location;

  user.save(function(err) {
	if (err)
	  res.send(err);

	res.json(user);
  });
});

User.list(function(req, res) {
  User.find(function(err, users) {
	if (err)
	  res.send(err);

	res.json(users);
  });
});

User.get(function(req, res) {
  User.findById(req.params.id, function(err, user) {
	if (err)
	  res.send(err);

	res.json(user);
  });
});

User.put(function(req, res) {
  User.findById(req.params.id, function(err, user) {
	if (err)
	  res.send(err);

	user.name = req.body.name || user.name;
  	user.password = req.body.password || user.password;
  	user.location = req.location || user.location;
;

	user.save(function(err) {
	  if (err)
		res.send(err);

	  res.json(user);
	});
  });
});

User.delete(function(req, res) {

  User.findByIdAndRemove(req.params.id, function(err) {
	if (err)
	  res.send(err);

	res.json({ message: 'User removed successfully!' });
  });
});

module.exports = User;