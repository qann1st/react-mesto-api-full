const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .uri()
        .regex(/^https?:\/\//i),
    }),
  }),
  createCard,
);
router.delete(
  '/:id',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  deleteCard,
);
router.put(
  '/:id/likes',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  likeCard,
);
router.delete(
  '/:id/likes',
  celebrate({
    params: {
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    },
  }),
  deleteLikeCard,
);

module.exports = router;
