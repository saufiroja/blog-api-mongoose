require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// IMPORT ROUTER
const authRouter = require('./routers/auth.routers');
const postRouter = require('./routers/post.routers');

// CONNECTION DATABASE
require('./database/config');

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// ROUTERS
app.use('/api', authRouter);
app.use('/api', postRouter);

// HANDLING ERROR
app.use((err, req, res, next) => {
  const { message, code = 500, error = 'internal server error' } = err;
  return res.status(code).json({
    message,
    code,
    error,
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port ${PORT}`);
});
