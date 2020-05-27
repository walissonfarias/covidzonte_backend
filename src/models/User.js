const mongoose = require('../database/connection');
const PointSchema = require('./utils/PointSchema');

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, 'UID is required'],
    unique: [true, 'This UID is already registered'],
  },
  name: {
    type: String,
    require: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email is already registered'],
    lowercase: true,
  },
  situation: {
    type: String,
    enum: ['saudavel', 'suspeito', 'confirmado'],
    require: [true, 'Situation is required'],
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
