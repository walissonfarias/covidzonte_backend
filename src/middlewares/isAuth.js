/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const parts = authHeader && authHeader.split(' ');

    if (!(parts.length === 2)) {
      return res.status(401).json({
        code: 401,
        message: 'Token Invalid',
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        code: 401,
        message: 'Token malformated',
      });
    }

    return jwt.verify(token, process.env.JWT_SECRETKEY, (err) => {
      if (err) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
        });
      }
      next();
    });
  }
  return res.status(403).json({
    code: 403,
    message: 'No token provided',
  });
};
