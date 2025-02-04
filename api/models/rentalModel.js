const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Types.UUID,
      required: [true, 'Please, provide rented car Id'],
    },
    clientId: {
      type: mongoose.Types.UUID,
      required: [true, 'Please, provide client Id'],
    },
    rentalDate: {
      type: Date,
      required: [true, 'Please, provide rental start date'],
      validate: {
        validator: function(value) {
          return value >= new Date();
        },
        message: 'Rental start date can not be in the past'
      }
    },
    returnDate: {
      type: Date,
      required: [true, 'Please, provide rental end date'],
      validate: {
        validator: function(value) {
          const minDate = new Date();
          minDate.setDate(currentDate.getDate() + 1);
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

module.exports = mongoose.Model('Rental', rentalSchema);
