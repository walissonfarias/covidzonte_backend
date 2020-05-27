/* eslint-disable consistent-return */
const Validator = require('validatorjs');
const firebase = require('firebase');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    await User.findById(req.params.id)
      .exec((err, user) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: 'Error finding user',
          });
        }
        return res.status(200).json(user);
      });
  },

  async store(req, res) {
    const { body } = req;
    const rules = {
      name: 'required|string',
      email: 'required|email',
      situation: 'required|string',
      latitude: 'required|numeric',
      longitude: 'required|numeric',
      password: 'required|string',
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

  async update(req, res) {
    const { body } = req;
    const rules = {
      name: 'required|string',
      email: 'required|email',
      situation: 'required|string',
      latitude: 'required|numeric',
      longitude: 'required|numeric',
      password: 'required|string',
    };
    const validation = new Validator(body, rules);
    if (validation.fails()) {
      const { errors: { errors } } = validation;
      return res.status(400).json({
        code: 400,
        errors,
      });
    }

    await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec((err, user) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: 'Error updating user',
          });
        }
        return res.status(200).json(user);
      });
  },

  async destroy(req, res) {
    await User.findByIdAndDelete(req.params.id)
      .exec((err, user) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: 'Error deleting user',
          });
        }
        return res.status(200).json(user);
      });
  },
};
