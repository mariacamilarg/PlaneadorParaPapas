const mongoose = require('../db');
var Schema = mongoose.Schema;

var itemSchema = new Schema({ //TO_DO field restrictions
  name: {type: String, required: true},
  dueDay: {type: Date, required: true},
  category: String,
  type: String,
  reminderDate: Date,
  amount: Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;