const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Car = require('../src/models/carModel');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

const mongoConnection = process.env.MONGO_CONNECTION;
const mongoPassword = process.env.MONGO_PASSWORD;
const dbConnection = mongoConnection.replace('PASSWORD', mongoPassword);

before(async () => {
  await mongoose.connect(dbConnection);
  await Car.deleteMany({});
});

after(async () => {
  await Car.deleteMany({});
  await mongoose.disconnect();
});

describe('Car model tests', () => {
  it('Should get 0 results', async () => {
    results = await Car.find();
    results.length.should.be.equal(0);
  });

  it('Should succesfully create a car', async () => {
    const carData = {
      make: '2001 Toyota Corola',
      type: 'sedan',
      price: 9000,
      rentPerDayBase: 10,
      productionYear: 2001,
    }

    await Car.create(carData);
    results = await Car.find();
    results.length.should.be.equal(1);
  });

  it('Should have 5 required fields', async () => {
    const carData = {};
    let error;
    try {
      await Car.create(carData);
    } catch (err) {
      error = err;
    };
    expect(error).to.not.be.undefined;
    expect(Object.keys(error.errors).length).to.be.equal(5);
    expect(error.errors).to.have.property('productionYear');
    expect(error.errors).to.have.property('rentPerDayBase');
    expect(error.errors).to.have.property('price');
    expect(error.errors).to.have.property('type');
    expect(error.errors).to.have.property('make');
  });

  it('Should only accept certain values for car type', async () => {
    const carData = {
      make: '2001 Toyota Corola',
      type: 'type',
      price: 9000,
      rentPerDayBase: 10,
      productionYear: 2001,
    }

    let error;
    try {
      await Car.create(carData);
    } catch(err) {
      error = err;
    };
    expect(error).to.not.be.undefined;
    expect(error.message).to.be.equal('Car validation failed: type: Incorrect car type provided');
    expect(error.errors.type.properties.enumValues).to.have.all.members([
      'sedan',
      'hatchback',
      'SUV',
      'minivan',
      'coupe',
      'convertible',
      'pickup'
    ]);
  });

  it('Should check for minimal production year', async () => {
    const carData = {
      make: '2001 Toyota Corola',
      type: 'sedan',
      price: 9000,
      rentPerDayBase: 10,
      productionYear: 1850,
    }

    let error;
    try {
      await Car.create(carData);
    } catch(err) {
      error = err;
    };
    expect(error).to.not.be.undefined;
    expect(error.errors).to.have.property('productionYear');
  });

  it('Should check for maximal production year', async () => {
    const carData = {
      make: '2001 Toyota Corola',
      type: 'sedan',
      price: 9000,
      rentPerDayBase: 10,
      productionYear: 2026,
    }

    let error;
    try {
      await Car.create(carData);
    } catch(err) {
      error = err;
    };
    expect(error).to.not.be.undefined;
    expect(error.errors).to.have.property('productionYear');
  });

  it('Should receive virtual property', async () => {
    const results = await Car.find();
    expect(results[0]).to.have.property('rentPerDay');
    expect(results[0].rentPerDay).to.be.a('number');
  });
});
