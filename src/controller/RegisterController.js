const User = require('../models/User');

module.exports = {
    async store(request, response) {
        const { name, email, password, latitude, longitude, situation } = request.body; 
        let user = await User.findOne({ email });


        console.log(user);
        if (user) {
            return response.status(400).send({ error: '_User already exists_' });
        } else {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            user = await User.create({
                name: name,
                password: password,
                email: email,
                location: location,
                situation: situation,
            })
            user.password = undefined; // deixa de mostrar a senha
        }
        return response.send({user});
    }
};