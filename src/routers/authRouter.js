const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and authorization routes
*/

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - firstName
 *               - surname
 *               - phoneNumber
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               surname:
 *                 type: string
 *                 description: Surname of the user
 *               middleName:
 *                 type: string
 *                 description: Middle name of the user (optional)
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               password:
 *                 type: string
 *                 description: User password
 *               confirmPassword:
 *                 type: string
 *                 description: Must match the password field
 *     responses:
 *       201:
 *         description: Successfully registered a new user
 *       400:
 *         description: Validation error (e.g., passwords do not match)
 */
router.post('/signup', authController.signUp);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: Successful login, returns access and refresh tokens
 *       400:
 *         description: Missing phone number or password
 *       401:
 *         description: Incorrect phone number or password
 */
router.post('/login', authController.login);
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh an expired access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token received from login
 *     responses:
 *       200:
 *         description: Returns a new access token
 *       401:
 *         description: No refresh token provided or token expired
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', authController.refresh);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token to invalidate session
 *     responses:
 *       204:
 *         description: Successfully logged out
 */
router.post('/logout', authController.logout);

module.exports = router;
