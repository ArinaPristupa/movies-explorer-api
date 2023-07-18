require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('express').Router();
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const limiter = require('./middlewares/rateLimit');
const { validationSignup, validationSignin } = require('./middlewares/validation');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const app = express();

app.use(express.json());

app.use(cors());
app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validationSignup, createUser);
app.post('/signin', validationSignin, login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use('/', router.all('*', (req, res, next) => {
  next(new NotFoundError('404 Ошибка! Данные не найдены!'));
}));

app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(3000);
