const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// Роутинг
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);
app.use('/', errorRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
