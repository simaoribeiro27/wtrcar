var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({

    idUser: { type: String, required: true},
    idTravel: { type: String, required: true},
    name : { type: String, required: true},
    email : String,
    phone : String,
    places: Number,
    startingData:String, 

});

module.exports = mongoose.model('Reservation', reservationSchema);
