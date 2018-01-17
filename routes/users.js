var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET ALL USERS*/
router.get('/users', function (req, res, next) {
  User.find(function (err, users) {
    if (err) { res.send(err); }
    console.log('all users: ' + JSON.stringify(users));
    res.json(users);
  });
});

/* GET ONE USER*/
router.get('/users/:_id', function (req, res, next) {
  User.findById(req.params._id, function (err, users) {
    if (err) { res.send(err); }
    console.log('user:' + JSON.stringify(users));
    res.json(users);
  });
});

/* POST USER */
router.post('/users', function (req, res) {
  var user = new User(); // create a new instance
  user.local.name = req.body.name;  // set 
  user.local.email = req.body.email;
  user.local.password = req.body.password;
  user.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
  });
});

/* PUT USER */
router.put('/users/:_id', function (req, res) {
  User.findById(req.params._id, function (err, user) {
    if (err)
      res.send(err);
      user.local.name = req.body.name;  // update
    user.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'User updated!' });
    });
  });
});

/* DELETE USER */
router.delete('/users/:_id', function (req, res)  {
  User.remove({_id: req.params._id }, function(err, user) {
      if (err)
      res.send(err);
      res.json({ message: 'User successfully deleted' });
  });
});

module.exports = router;

