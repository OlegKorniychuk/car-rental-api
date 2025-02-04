const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rentPerDayBase: {
    type: Number,
    required: true,
  },
  productionYear: {
    type: Number,
    min: [1900, 'Production year can not be less than 1920'],
    validate: {
      validator: function (value) {
        return value <= new Date().getFullYear();
      },
      message: 'Production year can not be greater than the current year'
    }
  },
})

carSchema.virtual('rentPerDay').get(function () {
  const ageFullYears = new Date().getFullYear() - this.productionYear;
  const coef = (100 - ageFullYears) / 100;
  return this.rentPerDayBase * coef;
})

module.exports = mongoose.Model('Car', carSchema);
