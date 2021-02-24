const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth.js');
const {
  getUsers, getUserById, getCurrentUser, updateProfileInfo, updateAvatar,
} = require('../controllers/users');

// Запрос списка пользователей
router.get('/users', auth, getUsers);

// Запрос информации о пользователе по id
router.get('/users/:userId', auth, getUserById);

// Запрос информации о текущем пользователе
router.get('/users/me', auth, getCurrentUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileInfo);

// Запрос на обновление аватара пользователя
router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
  }),
}), updateAvatar);

module.exports = router;
