const mongoose = require('mongoose');

const { URI } = process.env;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connect on database');
  });
