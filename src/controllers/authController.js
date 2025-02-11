const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Client = require('../models/clientModel');
const { promisify } = require('util');

const signJwt = (clientId, isAdmin=false) => 
  jwt.sign(
    { id: clientId, adm: isAdmin }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE }
  );

exports.signUp = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError(400, 'Passwords don`t match'));
  }

  const newClient = await Client.create({
    firstName: req.body.firstName,
    surename: req.body.surename,
    middleName: req.body.middleName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password
  });
  const token = signJwt(newClient._id)

  res.status(201).json({
    status: 'success',
    auth: token,
    data: {
      client: newClient,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) return next(new AppError(400, 'Phone number or password missing'));

  const client = await Client.findOne({ phoneNumber: phoneNumber }).select('+password');
  const passwordCorrect = client?.checkPassword(password, client?.password);

  if (!client || !passwordCorrect) return next(401, 'Incorrect phone number or password');

  const token = signJwt(client._id);
  res.status(201).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  };
  if (!token) return next(new AppError(401, 'Please, log in'));

  const verifyToken = promisify(jwt.verify);
  const decodedToken = await verifyToken(token, process.env.JWT_SECRET);

  if (req.params.id !== decodedToken.id) return next(new AppError(403, 'Access denied'));
  const client = await Client.findById(decodedToken.id);
  if (!client) return next(new AppError(401, 'This user does not exist'));

  req.client = client;
  next();
});

exports.restrict = 
  (...roles) => 
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError(403, 'You do not have permission to perform this action'));
    };
    next();
  }