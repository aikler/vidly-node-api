const Joi = require('joi');
const mongoose = require('mongoose');
//const {genreSchema} = required('./genres');
const {genreSchema} = require('./genre');

//console.log('Genre Schema', Genre.Schema);

// const genreSchema = new mongoose.Schema({
//         name: {
//             type: String,
//             required: true,
//             trim: true,
//             minLength: 5,
//             maxLength: 250
//         }
//     });

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 250
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

// validation with joi
function validateMovie(movie){
    const schemaJoiMovie = Joi.object({
        title: Joi.string().alphanum().min(2).max(50).required(),
        //genre: Joi.string().alphanum().min(2).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.string().pattern(new RegExp('^[0-9]{1,15}$')).required(),
        dailyRentalRate: Joi.string().pattern(new RegExp('^[0-9]{1,15}$')).required(),
    });
    return schemaJoiMovie.validate(movie);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;
