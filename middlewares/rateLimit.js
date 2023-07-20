const rateLimit = require('express-rate-limit');

const limit = rateLimit({
  max: 100,
  windowMs: 5 * 60 * 1000,
  message: 'Превышено допустимое количество попыток. Попробуйте повторить запрос позже',

});

module.exports = limit;
