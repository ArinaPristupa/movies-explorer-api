const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../middlewares/validation');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/movies', getMovies);

// создаёт фильм с переданными в теле
moviesRouter.post('/movies', validationCreateMovie, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/movies/:movieId', validationDeleteMovie, deleteMovie);

module.exports = moviesRouter;
