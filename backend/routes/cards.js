const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// Запрос списка карточек
router.get('/cards', getCards);

// Запрос на создание карточки
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
  }),
}), createCard);

// Запрос на удаление карточки
router.delete('/cards/:cardId', deleteCard);

// Запрос на добавление лайка карточке
router.put('/cards/:cardId/likes', likeCard);

// Запрос на удаление лайка с карточки
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
