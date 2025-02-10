const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router
  .route('/')
  .get(clientController.read)
  .post(clientController.create);

router
  .route('/:id')
  .get(clientController.readOne)
  .patch(clientController.update)
  .delete(clientController.delete);

module.exports = router;
