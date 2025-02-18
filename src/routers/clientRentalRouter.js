const express = require('express');
const rentalController = require('../controllers/rentalController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, rentalController.read)
  .post(authController.protect, rentalController.checkIds, rentalController.create);

router.route('/:rentalId/calculate-price') 
  .get(authController.protect, rentalController.calculateRentalCost);

router
  .route('/:rentalId')
  .get(authController.protect, rentalController.readOne);

router
  .route('/:rentalId/details')
  .get(authController.protect, rentalController.details);

module.exports = router;
