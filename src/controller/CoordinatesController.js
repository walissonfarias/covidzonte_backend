const User = require('../models/User');

module.exports = {
    async updateCoordinates(request, response) {
        const { inputEmail } = request.query;

        let user = await User.findOne({email: inputEmail});

        if (!user) {
            return response.status(400).send({ error: 'Email not found' });
        } else {
            const { latitude, longitude } = request.body;

            await user.updateOne({
                $set: {
                    latitude: latitude,
                    longitude: longitude,
                }
            });
            return response.status(200).send({ message: 'Coordinates has been updated'});
        }
    },
};