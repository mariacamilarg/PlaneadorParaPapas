const User = require('../models/user')
const Item = require('../models/item')

module.exports = function(app) {

  //Users 

  app.get('/users', User.list);
  app.get('/users/:id', User.get);
  app.post('/users', User.add);
  app.delete('/users/:id', User.delete);
  app.put('/users/:id', User.update);

  //Items

  app.get('/users/:id/items', Item.list);
  app.get('/users/:id/items/:id', Item.get);
  app.post('/users/:id/items', Item.add);
  app.delete('/users/:id/items/:id', Item.delete);
  app.put('/users/:id/items/:id', Item.update);
}
