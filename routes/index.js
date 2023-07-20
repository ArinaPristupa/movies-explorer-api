const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationSignup, validationSignin } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validationSignup, createUser);
router.post('/signin', validationSignin, login);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('404 Ошибка! Данные не найдены!'));
});

module.exports = router;
