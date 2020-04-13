const User = require('../models/User');

module.exports = {
    async update(request, response) {
        const { inputEmail } = request.query;

        let user = await User.findOne({email: inputEmail});

        if (!user) {
            return response.status(400).send({ error: 'Email not found' });
        } else {
            const { name, email, password, latitude, longitude, situation } = request.body;

            await user.updateOne({
                $set: {
                    name: name,
                    email: email,
                    password: password,
                    latitude: latitude,
                    longitude: longitude,
                    situation: situation,
                }
            });
            return response.status(200).send({ message: 'User has been updated'});
        }
    },
};