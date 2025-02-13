class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode =  statusCode;
    this.message = message;
    this.status = statusCode.toString()[0] === '4' ? 'fail' : 'error';
    this.operational = true;
  }
}

module.exports = AppError;
