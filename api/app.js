'use strict';
const express = require('express');
const errorHandler = require('./utils/errorHandler');
const carRouter = require('./routers/carRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', carRouter);
app.use(errorHandler);

module.exports = app;
