const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require ('../middlewares/firebase');
module.exports = {
    async update(request, response) {
        const {email} = request.body;
       


        //let user = await User.findOne({ email }).select('+password');
        let user = await User.findOne({ email });

        if (!user) {
            return response.status(400).send({ error: 'Email not found' });
        } else {
            const { name, email, latitude, longitude, situation } = request.body;
            /*if (!await bcrypt.compare(password, user.password)) {
                return response.status(400).send({ error: 'Invalid password' });
            }
            const newEncriptPassword = await bcrypt.hash(newPassword, 10);*/
            console.log(user);

            await user.updateOne({
                $set: {
                    name,
                    email,
                    //password: newEncriptPassword,
                    latitude: latitude,
                    longitude: longitude,
                    situation: situation,
                }
            });
            return response.status(200).send({ message: 'User has been updated' });
        }

    },
};