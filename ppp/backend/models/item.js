const mongoose = require('../db');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  dueDay: Date,
  category: String,
  type: String,
  reminderDate: Date,
  amount: Number
});

var Item = mongoose.model('Item', itemSchema);

Item.find({}, function(err, items) {
  if (err) throw err;
  
});

module.exports = Item;