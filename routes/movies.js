const {Movie, validate} = require('../models/movie');
const express = require('express');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    if (!movies) return res.status(404).send('No movies in database.');
    res.send(movies);
})

// Get/Id
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');    
    res.send(movie);
})

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    const result = await movie.save();
    res.send(result);
})

// Edit
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    movie.name = req.body.name;
    const result = await movie.save();
    res.send(result);
})

// Delete
router.delete('/:id', async (req, res) => {
    const result = await Movie.findByIdAndRemove(req.params.id);
    if (!result) res.status(404).send('The movie with the given ID was not found.');

    res.send(result);
})

module.exports = router;