const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async update(request, response) {
        const { email,newPassword } = request.body;
       


        let user = await User.findOne({ email }).select('+password');

        if (!user) {
            return response.status(400).send({ error: 'Email not found' });
        } else {
            const { name, email, password, latitude, longitude, situation } = request.body;
            if (!await bcrypt.compare(password, user.password)) {
                return response.status(400).send({ error: 'Invalid password' });
            }

            console.log(user);
            await user.updateOne({
                $set: {
                    name,
                    email,
                    password: newPassword,
                    latitude: latitude,
                    longitude: longitude,
                    situation: situation,
                }
            });
            return response.status(200).send({ message: 'User has been updated' });
        }

    },
};