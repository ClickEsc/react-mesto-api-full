const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, login, createUser, updateProfileInfo, updateAvatar,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth.js');

// Запрос списка пользователей
router.get('/users', auth, getUsers);

// Запрос информации о пользователе по id
router.get('/users/:userId', auth, getUserById);

// Запрос информации о текущем пользователе
router.get('/users/me', auth, getCurrentUser);

// Запрос на вход пользователя
router.post('/signin', login);

// Запрос на регистрацию пользователя
router.post('/signup', createUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', auth, updateProfileInfo);

// Запрос на обновление аватара пользователя
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
