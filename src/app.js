'use strict';
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const errorController = require('./controllers/errorController');
const carRouter = require('./routers/carRouter');
const clientRouter = require('./routers/clientRouter');
const authRouter = require('./routers/authRouter');
const packageJson = require('../package.json');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car-rental API',
      version: packageJson.version,
      description: 'Car-rental API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/welcome', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the car-rental API!'
  })
});
app.use('/api', authRouter);
app.use('/api/cars', carRouter);
app.use('/api/clients', clientRouter);
app.use(errorController);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found'
  });
})

module.exports = app;
