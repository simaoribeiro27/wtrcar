var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');



/* GET ALL RESERVATION*/
router.get('/reservations', function (req, res, next) {
  Reservation.find(function (err, reservations) {
      if (err) { res.send(err); }
     console.log('all reservations:' + JSON.stringify(reservations));
      res.json(reservations);
  });
});

/* GET ONE RESERVATION*/
router.get('/reservations/:_id', function (req, res, next) {
  Reservation.findById(req.params._id, function (err, reservations) {
    if (err) { res.send(err); }
    console.log('reservation:' + JSON.stringify(reservations));
    res.json(reservations);
  });
});

/* GET all RESERVATION by idTravel*/
router.get('/reservationsT/:idTravel', function (req, res, next) {
  Reservation.find({ idTravel: req.params.idTravel }, function (err, reservations) {
      if (err) { res.send(err); }
      res.json(reservations);
    });
  });

/* POST RESERVATION */
router.post('/reservations', function (req, res) {
  var reservation = new Reservation(); // create a new instance
  reservation.idUser = req.body.idUser;  // set 
  reservation.idTravel = req.body.idTravel; 
  reservation.name = req.body.name; 
  reservation.email = req.body.email; 
  reservation.phone = req.body.phone;
  reservation.places = req.body.places; 
  reservation.startingData = req.body.startingData;
  reservation.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'Reservation created!' });
  });
});

/* PUT RESERVATION*/
router.put('/reservations/:_id', function (req, res) {
  Reservation.findById(req.params._id, function (err, reservation) {
    if (err)
      res.send(err);
      reservation.name = req.body.name;  // update
    reservation.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'Reservation updated!' });
    });
  });
});

/* DELETE RESERVATION */
router.delete('/reservations/:_id', function (req, res)  {
  Reservation.remove({_id: req.params._id }, function(err, reservation) {
      if (err)
      res.send(err);
      res.json({ message: 'Reservation successfully deleted' });
  });
});

module.exports = router;

