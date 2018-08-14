const mongoose = require('mongoose');
const Joi = require('joi');
const {movieSchema} = require('./movie');


const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({ // Different schema to customer model (e.g. subset, optional)
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateMovie(movie) {
    const schema = {
        customerId: Joi.required(),
        movieId: Joi.required()
    }

    return Joi.validate(movie, schema);
}

exports.Rental = Rental;
exports.validate = validateMovie;
