const express = require('express');
const { validate, Customer } = require('../models/customer');
const router = express.Router();

// get list of all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//get by id
router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
});

// //update by id
router.put('/:id', async (req, res) => {
    // validate with Joi
     const {value, error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, {
        new: true
    });
    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
});

//create customer
router.post('/', async(req, res) => {
    const {value, error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    await customer.save();
    res.send(customer);
});

module.exports = router;
