require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimit');

const router = require('./routes/index');

const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(3000);
