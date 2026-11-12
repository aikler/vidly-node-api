const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    phone: {
        type: String,
        minLength: 5,
        maxLength: 15,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

// validation with joi
function validateCustomer(customer){
    const schemaJoiCustomer = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().alphanum().min(2).max(50).required(),
        phone: Joi.string().pattern(new RegExp('^[0-9]{5,15}$')).required()
    });
    return schemaJoiCustomer.validate(customer);
}

//module.exports = Customer;
exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;
