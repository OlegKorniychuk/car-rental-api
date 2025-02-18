const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router
  .route('/')
  .get(carController.read);

router
  .route('/:carId')
  .get(carController.readOne);

module.exports = router;
