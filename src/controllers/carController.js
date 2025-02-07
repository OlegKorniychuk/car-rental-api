const Car = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');

const carCrud = makeCrud('car', Car);

exports.create = catchAsync(carCrud.create);

exports.read = catchAsync(carCrud.read);

exports.readOne = catchAsync(carCrud.readOne);

exports.update = catchAsync(carCrud.update);

exports.delete = catchAsync(carCrud.delete);
