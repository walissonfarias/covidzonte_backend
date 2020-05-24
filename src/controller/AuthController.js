/* eslint-disable consistent-return */
const Validator = require('validatorjs');
const firebase = require('firebase');
const admin = require('firebase-admin');
const User = require('../models/User');

module.exports = {
  async login(req, res) {
    const { body } = req;
    const rules = {
      email: 'required|string|email',
      password: 'required',
    };
    const validation = new Validator(body, rules);
    if (validation.fails()) {
      const { errors } = validation.errors;
      return res.status(400).json({
        code: 400,
        errors,
      });
    }
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).then(async (account) => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
        });
      }
      const { uid } = account.user;
      admin.auth().createCustomToken(uid).then((() => res.status(200).json({
        code: 200,
        message: 'Login successfull',
      })));
    }).catch(() => res.status(401).json({
      code: 401,
      message: 'Unauthorized',
    }));
  },

  async logout(req, res) {
    firebase.auth().signOut().then(() => res.status(200).json({
      code: 200,
      message: 'Logout successfull',
    })).catch(() => res.status(401).json({
      code: 401,
      message: 'Logout error',
    }));
  },
};
