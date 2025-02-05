module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  const date = new Date();
  console.log(`${date.toLocaleString()} | ${req.method} at ${req.url} produced an error:\n`, err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}