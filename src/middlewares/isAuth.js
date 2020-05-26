/* eslint-disable consistent-return */
const admin = require('firebase-admin');
const firebase = require('firebase');

module.exports = (req, res, next) => {
  try {
    firebase.auth().currentUser.getIdToken().then((token) => {
      if (token) {
        admin.auth().verifyIdToken(token).then(() => {
          next();
        }).catch(() => res.status(401).json({
          code: 401,
          message: 'Unauthorized',
        }));
      }
    }).catch(() => res.status(403).json({
      code: 403,
      message: 'No token provided',
    }));
  } catch (e) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
    });
  }
};
