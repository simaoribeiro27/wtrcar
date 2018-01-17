var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var port = process.env.PORT || 3000;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var travels = require('./routes/travels');
var reservations = require('./routes/reservations');
//for andorid
var reservationsT = require('./routes/reservations');
//
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
//rota web
app.use('/', routes);
//rotas serviço
app.use('/', users);
app.use('/', travels);
app.use('/', reservations);
//for android
app.use('/', reservationsT);
//
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

//Charts

//MongoDB connection URL - mongodb://host:port/dbName
var mongodb = require("mongodb");
var dbHost = "mongodb://alfa:alfa1963@ds133127.mlab.com:33127/tas";
//DB Object
var dbObject;
//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient
//Connecting to the Mongodb instance.
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  dbObject.collection("travels").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var priceArray = [];
    var startingArray = [];
    var arriveArray = [];

    for ( index in docs){
      var doc = docs[index];
      //category array
      var price = doc['price'];
      //series 1 values array
      var starting = doc['starting'];
      //series 2 values array
      var arrive = doc['arrive'];
      priceArray.push({"label": price});
      startingArray.push({"value" : starting});
      arriveArray.push({"value" : arrive});
    }

    var dataset = [
      {
        "seriesname" : "starting",
        "data" : startingArray
      },
      {
        "seriesname" : "arrive",
        "data": arriveArray
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : priceArray
    };
    responseObj.json(response);
  });
}
//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/charts", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});
// end  charts

//app.listen(port);

module.exports = app;
