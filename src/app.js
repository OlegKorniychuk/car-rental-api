'use strict';
const express = require('express');
const cors = require('cors');
const errorController = require('./controllers/errorController');
const carRouter = require('./routers/carRouter');
const clientRouter = require('./routers/clientRouter');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/welcome', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the car-rental API!'
  })
});
app.use('/api', authRouter);
app.use('/api/cars', carRouter);
app.use('/api/clients', clientRouter);
app.use(errorController);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found'
  });
})

module.exports = app;
