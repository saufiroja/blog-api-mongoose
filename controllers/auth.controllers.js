const createError = require('http-errors');

const { User } = require('../database/models/User.models');
const { generateAccessToken } = require('../middlewares/token.middlewares');

// SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const isExists = await User.findOne({ $or: [{ username }, { email }] });
    if (isExists) {
      return next(createError(400, 'username or email already exists'));
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    const token = generateAccessToken(user);

    return res.status(201).json({
      message: 'successfully signup user',
      code: 201,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, 'invalid email'));
    }

    const match = await user.checkPassword(password);
    if (!match) {
      return next(createError(400, 'invalid password'));
    }

    const token = generateAccessToken(user);

    return res.status(200).json({
      message: 'successfully login user',
      code: 200,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
