const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, provide client`s first name'],
  },
  surename: {
    type: String,
    required: [true, 'Please, provide client`s surename'],
  },
  middleName: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: [true, 'Please, provide client`s address'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please, provide client`s phone number'],
    validate: {
      validator: function(value) {
        const regex = /\+380[0-9]{9}/;
        return regex.test(value);
      },
      message: 'Please, input a valid phone number that starts with +380'
    },
  },
  discount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.Model('Client', clientSchema);
