const mongoose = require('../db');
var Schema = mongoose.Schema;

var itemSchema = new Schema({ //TO_DO field restrictions
  name: String,
  dueDay: Date,
  category: String,
  type: String,
  reminderDate: Date,
  amount: Number
});

var Item = mongoose.model('Item', itemSchema);

Item.add(function(req, res) {
  var item = new Item();

  item.name = req.body.name;
  item.dueDay = req.body.dueDay;
  item.category = req.body.category;
  item.type = req.body.type;
  item.reminderDate = req.body.reminderDate;
  item.amount = req.body.amount;

  item.save(function(err) {
	if (err)
	  res.send(err);

	res.json(item);
  });
});

Item.list(function(req, res) {
  Item.find(function(err, items) {
	if (err)
	  res.send(err);

	res.json(items);
  });
});

Item.get(function(req, res) {
  Item.findById(req.params.id, function(err, item) {
	if (err)
	  res.send(err);

	res.json(item);
  });
});

Item.put(function(req, res) {
  Item.findById(req.params.id, function(err, item) {
	if (err)
	  res.send(err);
	//Revisar si funciona así
	item.name = req.body.name || item.name;
	item.dueDay = req.body.dueDay || item.dueDay;
	item.category = req.body.category || item.category;
  	item.type = req.body.type || item.type;
  	item.reminderDate = req.body.reminderDate || item.reminderDate;
  	item.amount = req.body.amount || item.amount;
;

	item.save(function(err) {
	  if (err)
		res.send(err);

	  res.json(item);
	});
  });
});

Item.delete(function(req, res) {

  Item.findByIdAndRemove(req.params.id, function(err) {
	if (err)
	  res.send(err);

	res.json({ message: 'Item removed successfully!' });
  });
});

module.exports = Item;