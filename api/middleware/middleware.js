const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const middleware = [
  morgan('dev'),
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
];

module.exports = middleware;
