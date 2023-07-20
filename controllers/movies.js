const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Переданы неверные данные');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ message: 'Карточка успешно удаленна!' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Недостаточно прав');
      }
    })
    .catch(next);
};
