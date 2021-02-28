require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth.js');
const { signinInfoValidator } = require('./middlewares/validators/signin');
const { signupInfoValidator } = require('./middlewares/validators/signup');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');

const { PORT = 3001 } = process.env;

const app = express();

// CORS
/*
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));*/


app.use(cors());

/*const allowedCors = [
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
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  }
  next();
});*/

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Логгирование запросов
app.use(requestLogger);

// Роутинг
app.post('/signin', signinInfoValidator, login);

app.post('/signup', signupInfoValidator, createUser);

/*app.use(auth);*/

app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);

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
