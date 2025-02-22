const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');
const clientRentalRouter = require('./clientRentalRouter');

const router = express.Router();

router.use('/:clientId/rentals', clientRentalRouter);

router
  .route('/me')
  .get(authController.protect, clientController.readCurrent);

router
  .route('/:clientId')
  .get(authController.protect, clientController.readOne);

module.exports = router;
