const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.delete('/logout', authController.logout);

router
  .route('/')
  .get(clientController.read)
  .post(clientController.create);

router
  .route('/:id')
  .get(authController.protect, clientController.readOne)
  .patch(clientController.update)
  .delete(authController.restrict('manager'), clientController.delete);

module.exports = router;
