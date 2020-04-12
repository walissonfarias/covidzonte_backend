const User = require('../models/User');

module.exports = {
    async update(request, response) {
        const { inputEmail } = request.query;

        let user = await User.findOne({email: inputEmail});

        if (!user) {
            return response.json({ message: 'Email não cadastrado.' });
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
            return response.json( {message: "Usuário foi atualizado com sucesso."});
        }
    },
};