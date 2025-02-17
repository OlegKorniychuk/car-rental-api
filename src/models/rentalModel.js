const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Please, provide rented car Id'],
      immutable: [true, 'The car of an existing rental can not be changed']
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Please, provide client Id'],
      immutable: [true, 'The client of an existing rental can not be changed']
    },
    rentalStartDate: {
      type: Date,
      required: [true, 'Please, provide rental start date'],
      validate: {
        validator: function(value) { return value >= new Date(); },
        message: 'Rental start date can not be in the past'
      },
    },
    rentalEndDate: {
      type: Date,
      required: [true, 'Please, provide rental end date'],
      validate: {
        validator: function(value) {
          const minDate = new Date();
          minDate.setDate(minDate.getDate() + 1);
          return value >= minDate;
        },
        message: 'Minimum rental time is 1 day',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Rental', rentalSchema);
