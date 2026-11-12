const mongoose = require('mongoose');
const { customerSchema } = require('./customer');
const { required, ref, date } = require('joi');
const { movieSchema } = require('./movie');

const rentalSchema = mongoose.Schema({
    movie: movieSchema,
    customer: customerSchema,
    dateStart: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }

});

// joi validation function
function validateRental(){

}

const Rental = mongoose.model('Rental', rentalSchema);

// module.exports.validateRental = validateRental;
// module.exports.Rental = Rental;
exports.validateRental = validateRental;
exports.Rental = Rental;


