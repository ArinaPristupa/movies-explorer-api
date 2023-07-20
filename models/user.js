const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильный адрес электронной почты или пароль'));
      }

      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неправильный адрес электронной почты или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
