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
const errorRouter = require('./routes/error.js');

const { PORT = 3001 } = process.env;

const app = express();

// CORS
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Логгирование запросов
app.use(requestLogger);

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роутинг
app.post('/signin', signinInfoValidator, login);

app.post('/signup', signupInfoValidator, createUser);

app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);
app.use('/', errorRouter);

// Логгирование ошибок
app.use(errorLogger);

// Обработчики ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

// Сообщение о запуске сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
