require('dotenv').config('../.env');
const express = require('express');
const path = require('path');
const connectDB = require('../config/db');
const { notFoundHandler, errorHandler } = require('../middleware/error');

// Connect DB
connectDB();

const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));
// use Middleware
app.use(require('../middleware/middleware'));

// Routes
app.use(require('../routes/index'));

// NotFound
app.use(notFoundHandler);

// Error
app.use(errorHandler);

module.exports = app;
