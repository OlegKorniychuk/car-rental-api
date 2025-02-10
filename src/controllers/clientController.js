const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');

const clientCrud = makeCrud('client', Client);

exports.create = catchAsync(clientCrud.create);

exports.read = catchAsync(clientCrud.read);

exports.readOne = catchAsync(clientCrud.readOne);

exports.update = catchAsync(clientCrud.update);

exports.delete = catchAsync(clientCrud.delete);
