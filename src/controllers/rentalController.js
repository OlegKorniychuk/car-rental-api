const Rental = require('../models/rentalModel');
const Car = require('../models/carModel');
const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');
const AppError = require('../utils/appError');

const rentalCrud = makeCrud('rental', Rental);

exports.create = catchAsync(async (req, res, next) => {
  req.body.clientId = req.client.id;
  if (!req.body.carId) return next(new AppError(400, 'Car Id missing'));

  const car = await Car.findById(req.body.carId);
  if (!car.isAvailable) return next(new AppError(500, 'This car is currently not available'));

  const newRental = await Rental.create(req.body);
  await Car.findByIdAndUpdate(req.body.carId, { isAvailable: false });

  res.status(200).json({
    status: 'success',
    data: { rental: newRental },
  });
});

exports.read = catchAsync(async (req, res, next) => {
  const results = await Rental.find({ clientId: req.client.id }).populate('carId');

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      rentals: results
    }
  });
});

exports.readOne = catchAsync(async (req, res, next) => { 
  const rental = await Rental.findById(req.params.rentalId);
  if (rental.clientId.toString() !== req.client.id) return next(new AppError(403, 'Access denied'));

  res.status(200).json({
    status: 'success',
    data: {
      rental
    }
  });
});

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
});

exports.protectIds = catchAsync(async (req, res, next) => {
  const {carId, clientId} = req.body;
  if (carId || clientId) return next(new AppError(400, 'Car or Client of a rental can not be changed'));
  next();
});

// Prevents from changing rental start date if it has already started
exports.protectStartDate = catchAsync(async (req, res, next) => {
  if (req.body.startDate) {
    const id = req.params.id;
    const rental = await Rental.findById(id);

    if (!rental) return next(new AppError(404, `Rental with id ${id} not found`));
    const currentDate = new Date();
    const oldStartDate = new Date(rental.rentalStartDate);
    if (oldStartDate < currentDate) return next(new AppError(400, 'Can not change rental start date, it has already started'));
  }
  next();
});

const calculateRentalCost = (startDate, endDate, pricePerDay) => {
  const FINE_MODIFIER = 1.5;
  const currentDate = new Date();
  let fullRentDays = 0;
  let fullFineDays = 0;
  if (currentDate <= endDate) {
    fullRentDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  } else {
    fullRentDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    fullFineDays = Math.ceil((currentDate.getTime() - endDate.getTime()) / (1000 * 3600 * 24));
  }

  const finalRentPrice = fullRentDays * pricePerDay + fullFineDays * pricePerDay * FINE_MODIFIER;
  return finalRentPrice;
};

exports.getRentalCost = catchAsync(async(req, res, next) => {
  const rentalId = req.params.rentalId;
  const rental = await Rental.findById(rentalId).populate('carId');

  if (!rental) {
    return next(new AppError(404, `Rental with id ${rentalId} not found`));
  }

  const finalRentPrice = calculateRentalCost(rental.rentalStartDate, rental.rentalEndDate, rental.carId.rentPerDay);

  res.status(200).json({
    status: 'success',
    data: {
      finalRentPrice
    }
  });
});

exports.endRental = catchAsync(async (req, res, next) => {
  const rentalId = req.params.rentalId;
  const rental = await Rental.findById(rentalId).populate('carId');

  if (!rental) {
    return next(new AppError(404, `Rental with id ${rentalId} not found`));
  }

  const finalRentPrice = calculateRentalCost(rental.rentalStartDate, rental.rentalEndDate, rental.carId.rentPerDay);
  if (req.body.payment !== finalRentPrice) return next(new AppError(400, 'Incorrect payment value'));

  await Rental.findByIdAndUpdate(rentalId, { isOpen: false });
  await Car.findByIdAndUpdate(rental.carId._id, { isAvailable: true });

  res.status(200).json({
    status: 'success',
    data: null
  });
});
