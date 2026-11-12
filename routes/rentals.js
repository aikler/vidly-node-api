 const mongoose = require('mongoose');
 const express = require('express');
 const router = express.Router();
 //const Rental = require('./models/rental');
 const {Rental, validateRental} = require('../models/rental');
 const {Customer, validateCustomer } = require('../models/customer');
const { Movie } = require('../models/movie');

 router.get('/', (req, res) => {
    res.send("Getting rentals");
 });

 router.post('/', async (req, res) => {
    // validate data with Joi
    //if (!validate) return res.status(400).send('Request not valid');
    console.log('req.body:', req.body);
    //req.body

    // get customer
    const customer = await Customer.findById(req.body.customerId);
    console.log('Customer:', customer);

    //get movie
    const movie = await Movie.findById(req.body.movieId);
    console.log('Movie', movie);


    // cost = calculate how many dates * daily rate
    const rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        cost: 0
    });
    await rental.save();
    res.send(rental);

 });

 module.exports = router;
