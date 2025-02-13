const AppError = require('../utils/appError');

const errorHandlers = {
  'CastError': (err) => new AppError(400, `Invalid ${err.path}: ${err.value}`),
  'ValidationError': (err) => 
    new AppError(
      400, 
      `Invalid input data. ${Object.values(err.errors).map((el) => el.message).join('; ')}`
    ),
  'JsonWebTokenError': (err) => new AppError(401, 'Invalid access token. Please, log in again.'),
  'TokenExpiredError': (err) => new AppError(401, 'Your access token has expired. Please, log in again.')
};

module.exports = (err, req, res, next) => {
  const errorHandler = errorHandlers[err.name] || (() => err);
  const error = errorHandler();
  if (error.operational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message || 'Unknown operational error',
    });
  } else {
    const date = new Date();
    console.log(`${date.toLocaleString()} | ${req.method} at ${req.url} produced an error:\n`, err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  };
};