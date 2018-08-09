
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');

const logger = require('./middleware/logger');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const movies = require('./routes/movies')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const rentals = require('./routes/rentals')
const home = require('./routes/home')

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.set('view engine', 'pug');
app.set('views', './views'); //DEFAULT

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// Db work
dbDebugger('Connected to the database...')

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api', home);

// CONFIGURATION
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

// PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Listening on port ${port}...`);
});
