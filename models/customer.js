const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        typse: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(genre) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(genre, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;