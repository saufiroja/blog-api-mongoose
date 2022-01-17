require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIREIN } = process.env;

exports.generateAccessToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: parseInt(JWT_EXPIREIN),
  });
  return token;
};
