const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, 'Please, provide car make'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please, provide car type'],
      trim: true,
      enum: {
        values: ['sedan', 'hatchback', 'SUV', 'minivan', 'coupe', 'convertible', 'pickup'],
        message: 'Incorrect car type provided',
      },
    },
    price: {
      type: Number,
      required: [true, 'Please, provide the car`s price'],
    },
    rentPerDayBase: {
      type: Number,
      required: [true, 'Please, provide car`s base rent cost per day'],
      select: false
    },
    productionYear: {
      type: Number,
      required: [true, 'Please, provide car`s production year'],
      min: [1900, 'Production year can not be less than 1920'],
      validate: {
        validator: function (value) {
          return value <= new Date().getFullYear();
        },
        message: 'Production year can not be greater than the current year'
      }
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
)

carSchema.virtual('rentPerDay').get(function () {
  const ageFullYears = new Date().getFullYear() - this.productionYear;
  const coef = (100 - ageFullYears) / 100;
  return this.rentPerDayBase * coef;
})

module.exports = mongoose.model('Car', carSchema);
