const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-err');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequestError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new BadRequestError('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
