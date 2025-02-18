const express = require('express');
const rentalController = require('../controllers/rentalController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(authController.protect, rentalController.read)
  .post(authController.protect, rentalController.checkIds, rentalController.create);

router
  .route('/:rentalId')
  .get(authController.protect, rentalController.readOne);

router
  .route('/:rentalId/calculate-price')
  .get(authController.protect, rentalController.getRentalCost);

router
  .route('/:rentalId/details')
  .get(authController.protect, rentalController.details);

router
  .route('/:rentalId/end-rental')
  .post(authController.protect, rentalController.endRental);

module.exports = router;
