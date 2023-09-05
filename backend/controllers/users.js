const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequest, NotFound, Conflict } = require('../errors/index');

const { PRIVATE_KEY = 'mesto' } = process.env;

// вывод всех пользователей
module.exports.findAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(201).send({ data: { ...user.toJSON(), password: undefined } }))
      .catch((error) => {
        if (error.name === 'ValidationError') {
          next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        } else if (error.code === 11000) {
          next(new Conflict('Пользователь уже существует'));
        } else {
          next(error);
        }
      });
  });
};

// информация о пользователе
module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Передан несуществующий id пользователя'));
      } else if (error.message === 'NotFound') {
        next(new NotFound(`Пользователь по указанному id (${req.params.userId}) не найден`));
      } else {
        next(error);
      }
    });
};

// возвращает информацию полььзователя о своем профиле
module.exports.findMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((next));
};

// обновление данных о пользователе
module.exports.updateMeProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else if (error.message === 'NotFound') {
        next(new NotFound(`Пользователь с указанным id (${req.user._id}) не найден`));
      } else {
        next(error);
      }
    });
};

// обновление аватара
module.exports.updateMeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
      } else if (error.message === 'NotFound') {
        next(new NotFound(`Пользователь с указанным id (${req.user._id}) не найден`));
      } else {
        next(error);
      }
    });
};

// аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};
