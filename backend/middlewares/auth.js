const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Некорректный токен' });
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, 'secret-key');

  req.user = payload;

  next();
};
