const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please, provide client`s first name'],
      trim: true,
      minLength: [2, 'First name must be at least 2 characters long'],
      maxLength: [20, 'First name can not be longer than 20 characters'],
    },
    surename: {
      type: String,
      required: [true, 'Please, provide client`s surename'],
      trim: true,
      minLength: [2, 'Surename must be at least 2 characters long'],
      maxLength: [20, 'Surename can not be longer than 20 characters'],
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
      minLength: [2, 'Middle name must be at least 2 characters long'],
      maxLength: [20, 'Middle name can not be longer than 20 characters'],
    },
    address: {
      type: String,
      required: [true, 'Please, provide client`s address'],
      trim: true,
      minLength: [10, 'Address must be at least 10 characters long'],
      maxLength: [100, 'Address can not be longer than 100 characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please, provide client`s phone number'],
      trim: true,
      validate: {
        validator: function(value) {
          const regex = /\+380[0-9]{9}/;
          return regex.test(value);
        },
        message: 'Please, input a valid phone number that starts with +380'
      },
    },
    regularDiscount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Client', clientSchema);
