const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      unique: true
    },
    regularDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Please, input positive discount'],
      max: [100, 'Please, input discount that is less then 100']
    },
    password: {
      type: String,
      required: [true, 'Please, input your password'],
      minLength: [10, 'Your password must be at least 10 characters long'],
      maxLength: [30, 'Your password can not be longer than 30 characters'],
      select: false
    },
  },
  {
    timestamps: true
  }
);

clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

clientSchema.methods.checkPassword = async function(
  providedPassword, 
  correctPassword
) {
  return await bcrypt.compare(providedPassword, correctPassword);
};

module.exports = mongoose.model('Client', clientSchema);
