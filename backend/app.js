const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth.js');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const errorRouter = require('./routes/error.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// CORS
const allowedCors = [
  'https://api.skubilina.students.nomoreparties.space/',
  'https://www.api.skubilina.students.nomoreparties.space/',
  'http://api.skubilina.students.nomoreparties.space/',
  'http://www.api.skubilina.students.nomoreparties.space/',
  'https://skubilina.students.nomoreparties.space/',
  'https://www.skubilina.students.nomoreparties.space/',
  'http://skubilina.students.nomoreparties.space/',
  'http://www.skubilina.students.nomoreparties.space/',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use(cors());

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Логгирование запросов
app.use(requestLogger);

// Роутинг
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
  }),
}), createUser);

app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);
app.use('/', errorRouter);

// Логгирование ошибок
app.use(errorLogger);

// Обработчики ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

// Сообщение о запуске сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
