const { celebrate, Joi } = require('celebrate');

const valUrl = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(30),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(valUrl),
    trailerLink: Joi.string().required().pattern(valUrl),
    thumbnail: Joi.string().required().pattern(valUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationDeleteMovie = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string().required(),
    }),
});

module.exports.validationSignin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.validationSignup = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.validationUser = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .hex()
        .length(24),
    }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  }),
});
