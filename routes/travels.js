var express = require('express');
var router = express.Router();
var Travel = require('../models/travel');



/* GET ALL TRAVELS*/
router.get('/travels', function (req, res, next) {
  Travel.find(function (err, travels) {
    if (err) { res.send(err); }
    console.log('all travels: ' + JSON.stringify(travels));
    res.json(travels);
  });
});

/* GET ONE TRAVEL*/
router.get('/travels/:_id', function (req, res, next) {
  Travel.findById(req.params._id, function (err, travels) {
    if (err) { res.send(err); }
    console.log('travel:' + JSON.stringify(travels));
    res.json(travels);
  });
});

/* POST TRAVEL */
router.post('/travels', function (req, res) {
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
  travel.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'Travel created!' });
  });
});

/* PUT TRAVEL */
router.put('/travels/:_id', function (req, res) {
  Travel.findById(req.params._id, function (err, travel) {
    if (err)
      res.send(err);
    travel.busyPlaces = req.body.busyPlaces;  // update
    travel.placesAvailable = placesAvailable - busyPlaces;//retira os avaliados aos ocupados 
    //travel.placesAvailable = req.body.placesAvailable;  // update
    travel.save(function (err) {
      //if lugares igual ou menos qoe 0 retorna a mensagem
      if (placesAvailable <=0) 
      res.json({ message: 'No places avaliable!' });
      // en of if
      if (err)
        res.send(err);
      res.json({ message: 'Travel updated!' });
    });
  });
});

/* DELETE TRAVEL */
router.delete('/travels/:_id', function (req, res)  {
  Travel.remove({_id: req.params._id }, function(err, travel) {
      if (err)
      res.send(err);
      res.json({ message: 'Travel successfully deleted' });
  });
});

module.exports = router;

