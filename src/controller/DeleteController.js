const User = require('../models/User');

module.exports = {
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