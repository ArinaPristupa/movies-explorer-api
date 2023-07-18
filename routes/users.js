const usersRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  validationUser,
  validationUpdateUser,
} = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/users/me', validationUser, getUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/users/me', validationUpdateUser, updateUser);

module.exports = usersRouter;
