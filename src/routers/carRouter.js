const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router
  .route('/')
  .get(carController.read)
  .post(carController.create);

router
  .route('/:carId')
  .get(carController.readOne)
  .patch(carController.update)
  .delete(carController.delete);

module.exports = router;
