const User = require('../models/user')
const Item = require('../models/item')

module.exports = function(app) {

  //Users 

  app.get('/users', function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

  app.get('/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });

  app.post('/users', function(req, res) {
    var user = new User();

    user.username = req.body.username;
    user.name = req.body.name;
    user.password = req.body.password;
    user.location = req.location;

    user.save(function(err) {
      if (err)
        return res.send(err);

      res.json(user);
    });
  });

  app.delete('/users/:id', function(req, res) {

    User.findByIdAndRemove(req.params.id, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'User removed successfully!' });
    });
  });

  app.put('/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      user.username = req.body.username || user.username;
      user.name = req.body.name || user.name;
      user.password = req.body.password || user.password;
      user.location = req.location || user.location;
      ;

      user.save(function(err) {
        if (err)
          return res.send(err);

        res.json(user);
      });
    });
  });

  //Items

  app.get('/users/:id/items', function(req, res) {
    Item.find(function(err, items) {
      if (err)
        res.send(err);

      res.json(items);
    });
  });

  app.get('/users/:id/items/:id', function(req, res) {
    Item.findById(req.params.id, function(err, item) {
      if (err)
        res.send(err);

      res.json(item);
    });
  });

  app.post('/users/:id/items', function(req, res) {
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

  app.delete('/users/:id/items/:id', function(req, res) {

    Item.findByIdAndRemove(req.params.id, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Item removed successfully!' });
    });
  });

  app.put('/users/:id/items/:id', function(req, res) {
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
}
