const express = require('express');
const rentalController = require('../controllers/rentalController');

const router = express.Router();

router
  .route('/')
  .get(rentalController.read)
  .post(rentalController.checkIds, rentalController.create);

router
  .route('/:rentalId')
  .get(rentalController.readOne)
  .patch(
    rentalController.protectStartDate, 
    rentalController.protectIds, 
    rentalController.update,
  )
  .delete(rentalController.delete);

router
  .route('/:rentalId/details')
  .get(rentalController.details);

module.exports = router;
