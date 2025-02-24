const express = require('express');
const rentalController = require('../controllers/rentalController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Rental operations
 */

/**
 * @swagger
 * /clients/{clientId}/rentals:
 *   get:
 *     summary: Get all rentals for the authenticated client
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: object
 *                   properties:
 *                     rentals:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /clients/{clientId}/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *               rentalStartDate:
 *                 type: string
 *                 format: date-time
 *               rentalEndDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Rental created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rental:
 *                       $ref: '#/components/schemas/Rental'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clients/{clientId}/rentals/{rentalId}:
 *   get:
 *     summary: Get a specific rental by ID
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rental:
 *                       $ref: '#/components/schemas/Rental'
 *       403:
 *         description: Access denied
 *       404:
 *         description: Rental not found
 */

/**
 * @swagger
 * /clients/{clientId}/rentals/{rentalId}/calculate-price:
 *   get:
 *     summary: Calculate the rental cost for a specific rental
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calculated rental price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     finalRentPrice:
 *                       type: number
 *                       example: 100.5
 *       404:
 *         description: Rental not found
 */

/**
 * @swagger
 * /clients/{clientId}/rentals/{rentalId}/details:
 *   get:
 *     summary: Get detailed rental information including client and car details
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed rental information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rental:
 *                       $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Rental not found
 */

/**
 * @swagger
 * /clients/{clientId}/rentals/{rentalId}/end-rental:
 *   post:
 *     summary: End a rental and mark the car as available
 *     tags: [Rentals]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         description: Rental ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rental ended successfully
 *       400:
 *         description: Incorrect payment
 *       404:
 *         description: Rental not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - carId
 *         - clientId
 *         - rentalStartDate
 *         - rentalEndDate
 *       properties:
 *         id:
 *           type: string
 *           example: "60d72b2f9b1d8a0f2cd8a5f4"
 *         carId:
 *           type: string
 *           example: "60d72b2f9b1d8a0f2cd8a5f5"
 *         clientId:
 *           type: string
 *           example: "60d72b2f9b1d8a0f2cd8a5f6"
 *         rentalStartDate:
 *           type: string
 *           format: date-time
 *           example: "2025-02-24T14:00:00Z"
 *         rentalEndDate:
 *           type: string
 *           format: date-time
 *           example: "2025-02-26T14:00:00Z"
 *         isOpen:
 *           type: boolean
 *           example: true
 */


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
