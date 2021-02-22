const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        const regex = /^https?:\/\/(www\.)?\d?[a-zA-Z-]+\.\w+([a-zA-Z/]+)?#?/;
        return regex.test(url); // если url не удовлетворяет условиям, вернётся false
      },
      message: 'Введите URL.', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
