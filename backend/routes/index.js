const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .uri()
        .regex(/^https?:\/\//i),
    }),
  }),
  createUser,
);
router.use('*', (req, res) =>
  res.status(404).send({ message: 'Запрос не найден' }),
);

module.exports = router;
