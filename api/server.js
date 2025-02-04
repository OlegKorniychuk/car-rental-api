'use strict';
const app = require('./app')
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongoConnection = process.env.MONGO_CONNECTION;
const mongoPassword = process.env.MONGO_PASSWORD;
const dbConnection = mongoConnection.replace('PASSWORD', mongoPassword);

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((err) => {
    console.log('Could not connect to MongoDB');
    throw err;
  })

app.listen(port || 3000, () => {
  console.log(`Server up and running at port ${port}`);
});
