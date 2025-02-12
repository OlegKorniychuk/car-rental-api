const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.restrict('manager'), clientController.read)
  .post(authController.protect, authController.restrict('manager'), clientController.create);

router
  .route('/:id')
  .get(authController.protect, authController.restrict('manager'), clientController.readOne)
  .patch(authController.protect, authController.restrict('manager'), clientController.update)
  .delete(authController.protect, authController.restrict('manager'), clientController.delete);

module.exports = router;
