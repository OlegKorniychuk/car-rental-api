const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Routes for managing cars in the rental system
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get a list of all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: A list of all available cars
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
 *                     cars:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cars/{carId}:
 *   get:
 *     summary: Get details of a specific car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         description: The car's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 97abbadc758b2f848cc12c8e 
 *         make:
 *           type: string
 *           example: Toyota
 *         type:
 *           type: string
 *           enum:
 *             - sedan
 *             - hatchback
 *             - SUV
 *             - minivan
 *             - coupe
 *             - convertible
 *             - pickup
 *           example: SUV
 *         price:
 *           type: number
 *           example: 25000
 *         rentPerDay:
 *           type: number
 *           example: 50
 *         productionYear:
 *           type: number
 *           example: 2020
 *         isAvailable:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           example: 2025-02-11T21:02:20.671+00:00
 *         updatedAt:
 *           type: string
 *           example: 2025-02-11T21:02:20.671+00:00
 */


router
  .route('/')
  .get(carController.read);

router
  .route('/:carId')
  .get(carController.readOne);

module.exports = router;
