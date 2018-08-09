const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    if (!customers) return res.status(404).send('No customers in database.');
    res.send(customers);
})

// Get/Id
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');    
    res.send(customer);
})

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    const result = await customer.save();
    res.send(result);
})

// Edit
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    customer.isGold = req.body.isGold;
    customer.name = req.body.name;
    customer.phone = req.body.phone;
    const result = await customer.save();
    res.send(result);
})

// Delete
router.delete('/:id', async (req, res) => {
    const result = await Customer.findByIdAndRemove(req.params.id);
    if (!result) res.status(404).send('The customer with the given ID was not found.');

    res.send(result);
})

module.exports = router;
