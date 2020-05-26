/* eslint-disable consistent-return */
const Validator = require('validatorjs');
const firebase = require('firebase');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { body } = req;
    const rules = {
      name: 'required|string',
      email: 'required|email',
      situation: 'required|string',
      latitude: 'required|numeric',
      longitude: 'required|numeric',
      password: 'required|string|confirmed',
      password_confirmation: 'required|string',
    };
    const validation = new Validator(body, rules);
    if (validation.fails()) {
      const { errors: { errors } } = validation;
      return res.status(400).json({
        code: 400,
        errors,
      });
    }
    const {
      name, email, situation, latitude, longitude, password,
    } = body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    firebase.auth().createUserWithEmailAndPassword(email, password).then((account) => {
      User.create({
        name,
        email,
        situation,
        location,
        uid: account.user.uid,
      }, (err, user) => {
        if (err) {
          return res.status(400).json({
            code: 400,
            message: 'Error creating new user',
          });
        }
        return res.status(200).json(user);
      });
    }).catch((err) => res.status(400).json({
      code: 400,
      message: err.message,
    }));
  },
};
