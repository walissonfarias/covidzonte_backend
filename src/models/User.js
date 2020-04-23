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
    situation: {
        type: String,
        require: true,
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

// criptografar senha
UserSchema.pre('save', async function (next) { // antes de salvar
    let user = this;
    if(!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;