const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundErrors');
const Cards = require('../models/cards');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Cards.find({});
    res.send(cards);
  } catch (err) {
    next(new BadRequestError('Список карточек пуст'));
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Cards.create({
      name,
      link,
      owner: { _id: req.user._id },
    });
    res.send(newCard);
  } catch (err) {
    next(new BadRequestError('Некорректно заполнены поля'));
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const removedCard = await Cards.findByIdAndRemove(req.params.id);
    if (removedCard === null) {
      throw new NotFoundError('Такой карточки не существует');
    }
    if (removedCard.owner._id !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    res.send(removedCard);
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const likedCard = await Cards.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user } },
      { new: true, runValidators: true },
    ).populate('likes owner');
    if (likedCard.id === req.params.id) res.send(likedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректное id карточки'));
    } else {
      next(new NotFoundError('Карточка не найдена'));
    }
  }
};

module.exports.deleteLikeCard = async (req, res, next) => {
  try {
    const deletedLikeCard = await Cards.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user } },
      { new: true, runValidators: true },
    );
    if (deletedLikeCard === null) {
      throw new NotFoundError('Карточка с лайком не найдена');
    } else {
      res.send(deletedLikeCard);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректное id карточки'));
    } else {
      next(err);
    }
  }
};
