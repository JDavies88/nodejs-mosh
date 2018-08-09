const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'})
})

module.exports = router;