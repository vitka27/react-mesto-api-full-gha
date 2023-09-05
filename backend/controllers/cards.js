const Card = require('../models/card');
const { BadRequest, NotFound, Forbidden } = require('../errors/index');

// выводим список карточек
module.exports.findAllCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// создаем карточку
module.exports.createCard = (req, res, next) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(error);
      }
    });
};

// удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => { throw new Error('NotFound'); })
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        return Card.deleteOne({ _id: req.params.cardId }).then(() => res.send({ message: 'Карточка успешно удалена' }));
      }
      return next(new Forbidden('Нельзя удалить чужую карточку'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Передан некорректный id'));
      } else if (error.message === 'NotFound') {
        next(new NotFound(`Карточка с указанным id (${req.params.cardId}) не найдена`));
      } else {
        next(error);
      }
    });
};

//  поставить лайк карточке
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(() => { throw new Error('NotFound'); })
  .then((card) => res.send({ data: card }))
  .catch((error) => {
    if (error.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для постановки лайка'));
    } else if (error.message === 'NotFound') {
      next(new NotFound(`Передан несуществующий id (${req.params.cardId}) карточки`));
    } else {
      next(error);
    }
  });

// убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(() => { throw new Error('NotFound'); })
  .then((card) => res.send({ data: card }))
  .catch((error) => {
    if (error.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для снятия лайка'));
    } else if (error.message === 'NotFound') {
      next(new NotFound(`Передан несуществующий id (${req.params.cardId}) карточки`));
    } else {
      next(error);
    }
  });
