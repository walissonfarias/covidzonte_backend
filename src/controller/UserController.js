const User = require('../models/User');

module.exports = {

    async store(request, response) {
        const { name, email, password, latitude, longitude , situation} = request.body;

        let user = await User.findOne({ email }); // faz a verificação do email

        if (user) {
            return response.json({ message: "Email já existe."});
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
                situation, situation,
            })
        }
        return response.json(user);
    },

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
            return response.json( {message: "Usuário foi cadastrado com sucesso."});
        }
    },
    
    async delete(request, response) {

        const { inputEmail, inputPassword } = request.body;

        user = await User.findOne( { email: inputEmail });

        if(!user) {
            return response.json({message: "Email nao cadastrado"})
        }else {
            const { password } = user;
            if(inputPassword === password ) {
                user.remove();

                return response.json({ message: "Usuario foi deletado com sucesso..."});
            } else {
                return response.json({ message: "senha do usuário está errada, usuario não foi deletado..."});
            }

        }




    }
};