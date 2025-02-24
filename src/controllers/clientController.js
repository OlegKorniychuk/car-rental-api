const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const makeCrud = require('../utils/universalCrud');

const clientCrud = makeCrud('client', Client);

exports.create = catchAsync(clientCrud.create);

exports.read = catchAsync(clientCrud.read);

exports.readOne = catchAsync(clientCrud.readOne);

exports.readCurrent = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.client.id);
  if (!client) return next(new AppError(404, 'This user does not exist'));

  res.status(200).json({ 
    status: 'success',
    data: {
      client
    }
  });
});

exports.update = catchAsync(clientCrud.update);

exports.delete = catchAsync(clientCrud.delete);
