const Car = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.create = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { newCar },
  });
});

exports.read = catchAsync(async (req, res, next) => {
  const cars = await Car.find();

  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: {
      cars
    }
  })
});

exports.readOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const car = await Car.findById(id);

  if (!car) {
    return next(new AppError(404, `Car with id ${id} not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      car
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const newCar = await Car.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (newCar) {
    return next(new AppError(404, `Car with id ${id} not found`));
  };

  res.status(200).json({
    status: 'success',
    data: {
      newCar
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const car = await Car.findByIdAndDelete(id);

  if (car) {
    return next(new AppError(404, `Car with id ${id} not found`));
  };

  res.status(204).json({
    status: 'success',
    data: null
  });  
});
