const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async login(request, response) {
        let { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return response.status(400).send({ error: 'User not found.' })
        }
        
        if (!await bcrypt.compare(password, user.password)) {
            return response.status(400).send({error: 'Invalid password'});
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        })

        response.send({user, token});
    }
};