const Rental = require('../models/rentalModel');
const Car = require('../models/carModel');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');
const AppError = require('../utils/appError');

const rentalCrud = makeCrud('rental', Rental);

exports.create = catchAsync(async (req, res, next) => {
  req.body.clientId = req.client.id;
  const newRental = await Rental.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { rental: newRental },
  });
});

exports.read = catchAsync(async (req, res, next) => {
  const results = await Rental.find({ clientId: req.client.id });

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      rentals: results
    }
  });
});

exports.readOne = catchAsync(rentalCrud.readOne);

exports.update = catchAsync(rentalCrud.update);

exports.delete = catchAsync(rentalCrud.delete);

exports.details = catchAsync(async (req, res, next) => {
  const id = req.params.rentalId;
  const rental = await Rental.findById(id).populate(['clientId', 'carId']);

  if (!rental) {
    return next(new AppError(404, `Rental with id ${id} not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      rental
    }
  });
});

exports.checkIds = catchAsync(async (req, res, next) => {
  const {carId, clientId} = req.body;
  if (!carId || !clientId) {
    return next(new AppError(400, 'Car ID or Client ID missing!'));
  }
  const car = await Car.findById(carId);
  const client = await Client.findById(clientId);
  if (!car) return next(new AppError(400, 'Car with provided ID does not exist'));
  if (!client) return next(new AppError(400, 'Client with provided ID does not exist'));
  next();
})

exports.protectIds = catchAsync(async (req, res, next) => {
  const {carId, clientId} = req.body;
  if (carId || clientId) return next(new AppError(400, 'Car or Client of a rental can not be changed'));
  next();
});

// Prevents from changing rental start date if it has already started
exports.protectStartDate = catchAsync(async (req, res, next) => {
  if (startDate) {
    const id = req.params.id;
    const rental = await Rental.findById(id);

    if (!rental) return next(new AppError(404, `Rental with id ${id} not found`));
    const currentDate = new Date();
    const oldStartDate = new Date(rental.rentalStartDate);
    if (oldStartDate < currentDate) return next(new AppError(400, 'Can not change rental start date, it has already started'));
  }
  next();
})
