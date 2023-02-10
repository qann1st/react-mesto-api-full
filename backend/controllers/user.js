const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundErrors');
const User = require('../models/user');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) throw new NotFoundError('Пользователь не найден');
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный ID пользователя'));
    } else {
      next(err);
    }
  }
};

module.exports.getNowUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError('Такого пользователя не существует');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('ID пользователя некорректен'));
    } else {
      next(err);
    }
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    let { name, about, avatar, email, password } = await req.body;
    email.toLowerCase();

    const user = await User.findOne({ email });
    if (user !== null) {
      throw new ConflictError('Пользователь уже существует');
    }

    password = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password,
    });

    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const editedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(editedUser);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Не удалось изменить пользователя'));
    } else {
      next(err);
    }
  }
};

module.exports.editAvatar = async (req, res, next) => {
  try {
    const editedAvatar = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(editedAvatar);
  } catch (err) {
    next(new BadRequestError('Не удалось изменить аватар'));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email }).select('+password');
    if (!findUser) {
      return Promise.reject(new Error('Неправильная почта или пароль'));
    }

    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET);
    const matched = await bcrypt.compare(password, findUser.password);
    if (!matched) {
      return Promise.reject(new Error('Неправильная почта или пароль'));
    }

    res.send({
      token,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректно введены данные' });
    } else {
      next(err);
    }
  }
};
