const {Rental, validate} = require('../models/rental');
const express = require('express');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const rental = await Rental.find();
    if (!rental) return res.status(404).send('No rentals in database.');
    res.send(rental);
})

// Get/Id
router.get('/:id', async (req, res) => {
    const rental = await Movie.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');    
    res.send(rental);
})

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rental = new Rental({
        customer: req.body.customer,
        movie: req.body.movie
    });
    const result = await rental.save();
    res.send(result);
})

module.exports = router;