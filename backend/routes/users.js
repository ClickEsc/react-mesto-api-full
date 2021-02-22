const router = require('express').Router();
const {
  getUsers, getUserById, login, createUser, updateProfileInfo, updateAvatar,
} = require('../controllers/users');

// Запрос списка пользователей
router.get('/users', getUsers);

// Запрос информации о пользователе по id
router.get('/users/:userId', getUserById);

// Запрос на вход пользователя
router.post('/signin', login);

// Запрос на регистрацию пользователя
router.post('/signup', createUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', updateProfileInfo);

// Запрос на обновление аватара пользователя
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
