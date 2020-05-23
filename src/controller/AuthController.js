/* eslint-disable consistent-return */
const Validator = require('validatorjs');
const firebase = require('firebase');
const jwt = require('jsonwebtoken');
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
    firebase.auth().signInWithEmailAndPassword(email, password).then(async () => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
        });
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });
      const refreshToken = jwt.sign({ user }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRESIN,
      });
      return res.status(200).json({
        code: 200,
        token,
        refreshToken,
      });
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
