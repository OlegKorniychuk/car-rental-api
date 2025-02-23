const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const ms = require('ms');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Client = require('../models/clientModel');
const RefreshToken = require('../models/refreshTokenModel');

const verifyToken = promisify(jwt.verify);

const createAccessToken = (clientId, isAdmin=false) => 
  jwt.sign(
    { sub: clientId, adm: isAdmin }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE }
  );
const createRefreshToken = (clientId) => 
  jwt.sign(
    { sub: clientId  },
    process.env.REFRESH_SECRET
  );

exports.signUp = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError(400, 'Passwords don`t match'));
  }

  const newClient = await Client.create({
    firstName: req.body.firstName,
    surname: req.body.surname,
    middleName: req.body.middleName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password
  });

  res.status(201).json({
    status: 'success',
    data: {
      client: newClient,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) return next(new AppError(400, 'Phone number or password missing'));

  const client = await Client.findOne({ phoneNumber: phoneNumber }).select('+password -__v');
  const passwordCorrect = await client?.checkPassword(password, client?.password);

  if (!client || !passwordCorrect) return next(new AppError(401, 'Incorrect phone number or password'));

  const accessToken = createAccessToken(client._id);
  const refreshToken = createRefreshToken(client._id);
  await RefreshToken.create({ token: refreshToken });
  const clientData = client.toObject();
  delete clientData.password;
  res.status(201).json({
    status: 'success',
    accessToken,
    refreshToken,
    data: { client: clientData }
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  await RefreshToken.findOneAndDelete({ token: req.body.refreshToken });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.refresh = catchAsync(async (req, res, next) => {
  const refresh = req.body.refreshToken;
  if (!refresh) return next(new AppError(401, 'No refresh token provided'));

  const storedToken = await RefreshToken.findOne({ token: refresh });
  if (!storedToken) return next(new AppError(403, 'This session has ended. Please, log in'));

  if (Date.now() > storedToken.createdAt.getTime() + ms(process.env.REFRESH_EXPIRE)) {
    await RefreshToken.findOneAndDelete({ token: refresh });
    return next(new AppError(401, 'Your refresh token has expired. Please, log in'));
  };
  const decoded = await verifyToken(refresh, process.env.REFRESH_SECRET);
  const accessToken = createAccessToken(decoded.sub);
  res.status(200).json({
    status: 'success',
    accessToken
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  };
  if (!token) return next(new AppError(401, 'Please, log in'));

  const decodedToken = await verifyToken(token, process.env.JWT_SECRET);

  const client = await Client.findById(decodedToken.sub);
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
  };
