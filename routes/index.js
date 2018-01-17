var express = require('express');
var passport = require('passport');
var router = express.Router();
var Travel = require('../models/travel');
//html routes
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function (req, res) {
  res.render('signup.ejs', { message: req.flash('loginMessage') });
});

//dentro do perfil faz a lista
router.get('/profile', isLoggedIn, function (req, res) {
  //res.render('profile.ejs', { user: req.user });
  Travel.find(function (err, travels) {
    if (err) { res.send(err); }
    res.render('profile.ejs', { user: req.user, travels });
  });
  //
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

//Web post travel
router.post('/profile', function (req, res) {
  var travel = new Travel(); // create a new instance
  travel.idUser = req.body.idUser;  // set 
  travel.starting = req.body.starting;
  travel.arrival = req.body.arrival;
  travel.lat = req.body.lat;
  travel.long = req.body.long;
  travel.placesAvailable = req.body.placesAvailable;
  travel.busyPlaces = req.body.busyPlaces;
  travel.price = req.body.price;
  travel.startingData = req.body.startingData;
  travel.save({}, function (err, travel) {
    if (err) res.send(err);
  });
  res.redirect('/profile');
});

//web remove travel  by its id
router.get('/profile/delete/:_id', function (req, res) {
  if (req.params._id != '') {
    Travel.remove({ _id: req.params._id }, function (err, travel) {
      if (err)
        res.send(err);
      res.redirect('/profile');
    })
  }
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}


