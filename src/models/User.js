const mongoose = require('../database');
const PointSchema = require('./utils/PointSchema');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;