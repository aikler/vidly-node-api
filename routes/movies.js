const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre');
const {Movie, validate} = require('../models/movie');

// list of all movies
router.get('/', async(req, res) =>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});


router.get('/:id', async(req, res) =>{
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json(`Movie with ${req.params.id} not found.`);
    res.json(movie);
});


// Add new movie
router.post('/', async(req, res) => {
    const {error, value} = validate(req.body);// same as result.error
    if (error) return res.status(400).json(error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).json('Invalid genre');

    let movie = new Movie({
        title: value.title,
        genre: new Genre({
            _id: genre._id,
            name: genre.name
        }),
        numberInStock: value.numberInStock,
        dailyRentalRate: value.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

// update
router.put('/:id', async (req, res) => {
    //validate
    //const {error, value} = validate(req.body);// same as result.error
    const {error} = validate(req.body);// same as result.error
    if (error) return res.status(400).send(error.details[0].message);

    let movie = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    res.send(movie);
});


router.delete('/:id', async (req, res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).json(`Movie with ${req.params.id} not found.`);

    res.json(movie);
});


module.exports = router;
