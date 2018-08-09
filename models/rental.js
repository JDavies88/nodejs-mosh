const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateMovie(movie) {
    const schema = {
        customer: Joi.required(),
        movie: Joi.required()
    }

    return Joi.validate(movie, schema);
}

exports.Rental = Rental;
exports.validate = validateMovie;