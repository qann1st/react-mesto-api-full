const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUsers,
  getUser,
  editUser,
  editAvatar,
  getNowUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getNowUser);
router.get(
  '/:id',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      about: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  editUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .uri()
        .regex(/^https?:\/\//i),
    }),
  }),
  editAvatar,
);

module.exports = router;
