const Rental = require('../models/rentalModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');

const rentalCrud = makeCrud('rental', Rental);

exports.create = catchAsync(rentalCrud.create);

exports.read = catchAsync(rentalCrud.read);

exports.readOne = catchAsync(rentalCrud.readOne);

exports.update = catchAsync(rentalCrud.update);

exports.delete = catchAsync(rentalCrud.delete);

exports.details = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const rental = await Rental.findById(id).populate(['clientId', 'carId']);

  res.status(200).json({
    status: 'success',
    data: {
      rental
    }
  });
});
