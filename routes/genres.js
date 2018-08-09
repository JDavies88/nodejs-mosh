const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    if (!genres) return res.status(404).send('No genres in database.');
    res.send(genres);
})

// Get/Id
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');    
    res.send(genre);
})

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    const result = await genre.save();
    res.send(result);
})

// Edit
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    genre.name = req.body.name;
    const result = await genre.save();
    res.send(result);
})

// Delete
router.delete('/:id', async (req, res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    if (!result) res.status(404).send('The genre with the given ID was not found.');

    res.send(result);
})

module.exports = router;