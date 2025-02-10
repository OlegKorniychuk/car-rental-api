'use strict';
const express = require('express');
const errorHandler = require('./utils/errorHandler');
const carRouter = require('./routers/carRouter');
const clientRouter = require('./routers/clientRouter');
const rentalRouter = require('./routers/rentalRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/welcome', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the car-rental API!'
  })
});
app.use('/api/cars', carRouter);
app.use('/api/clients', clientRouter);
app.use('/api/rentals', rentalRouter);
app.use(errorHandler);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found'
  });
})

module.exports = app;
