const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');
const clientRentalRouter = require('./clientRentalRouter');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Routes for managing clients in the system
 */

/**
 * @swagger
 * /clients/me:
 *   get:
 *     summary: Get the current logged-in client
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current client details
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
 *                     client:
 *                       $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /clients/{clientId}:
 *   get:
 *     summary: Get a specific client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         description: The ID of the client
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 97abbadc758b2f848cc12c8e 
 *         firstName:
 *           type: string
 *           example: John
 *         middleName:
 *           type: string
 *           example: Jack
 *         surname:
 *           type: string
 *           example: Doe
 *         phoneNumber:
 *           type: string
 *           example: '+380974528411'
 *         address:
 *           type: string
 *           example: 123 Main St, Springfield
 *         regularDiscount:
 *           type: number
 *           example: 10
 *         createdAt:
 *           type: string
 *           example: 2025-02-11T21:02:20.671+00:00
 *         updatedAt:
 *           type: string
 *           example: 2025-02-11T21:02:20.671+00:00
 */

router.use('/:clientId/rentals', clientRentalRouter);

router
  .route('/me')
  .get(authController.protect, clientController.readCurrent);

router
  .route('/:clientId')
  .get(authController.protect, clientController.readOne);

module.exports = router;
