const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: [4, 'username mush have a minimum of 4 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must have a minimum of 8 characters'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
