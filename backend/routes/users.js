const router = require('express').Router();
const { userIdSchema, updateMeProfileSchema, updateMeAvatarSchema } = require('../utils/validateJoi');

const {
  findAllUsers, findUser, findMe, updateMeProfile, updateMeAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', findAllUsers);

// возвращает информацию полььзователя о своем профиле
router.get('/me', findMe);

// возвращает пользователя по _id
router.get('/:userId', userIdSchema, findUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', updateMeProfileSchema, updateMeProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', updateMeAvatarSchema, updateMeAvatar);

module.exports = router;
