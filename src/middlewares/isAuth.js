/* eslint-disable consistent-return */
const admin = require('firebase-admin');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: 'No token provided',
    });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({
      code: 401,
      message: 'Token Invalid',
    });
  }

  const [scheme, token] = parts;

  if (!(/^Bearer$/i.test(scheme))) {
    return res.status(401).json({
      code: 401,
      message: 'Token malformated',
    });
  }

  admin.auth().verifyIdToken(token).then(() => {
    next();
  }).catch(() => res.status(401).json({
    code: 401,
    message: 'Unauthorized',
  }));
};
