const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .post('/signup', authController.signUp)
  .post('/login', authController.login)
  .post('/refresh', authController.refresh)
  .delete('/logout', authController.logout);

module.exports = router;
