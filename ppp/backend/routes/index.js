const User = require('../models/user')

module.exports = function(app) {
  
  app.get('/users', User.list);
  app.get('/users/:id', User.get);
  app.post('/users', User.add);
  app.delete('/users/:id', User.delete);
}
