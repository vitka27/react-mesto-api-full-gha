const router = require('express').Router();

const {
  createCard, findAllCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardSchema, cardIdSchema } = require('../utils/validateJoi');

// возвращает все карточки
router.get('/', findAllCard);

// создаёт карточку
router.post('/', createCardSchema, createCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', cardIdSchema, deleteCard);

// поставить лайк карточке
router.put('/:cardId/likes', cardIdSchema, likeCard);

// убрать лайк с карточки
router.delete('/:cardId/likes', cardIdSchema, dislikeCard);

module.exports = router;
