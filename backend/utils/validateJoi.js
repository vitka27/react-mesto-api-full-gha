const { Joi, celebrate } = require('celebrate');
const patterns = require('./patterns');

//* ------------------ user validation ----------------------
const userIdSchema = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const signupSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(patterns.url),
  }),
});

const singinSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateMeProfileSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateMeAvatarSchema = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(patterns.url),
  }),
});

//* ------------------ card validation ----------------------
const cardIdSchema = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const createCardSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(patterns.url).required(),
  }),
});

module.exports = {
  signupSchema,
  singinSchema,
  userIdSchema,
  updateMeProfileSchema,
  updateMeAvatarSchema,
  createCardSchema,
  cardIdSchema,
};
