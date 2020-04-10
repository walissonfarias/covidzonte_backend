const User = require('../models/User');

module.exports = {
    async login(request,response) {
        const { inputEmail, inputPassword} = request.query;

        const user = await User.findOne({ email: inputEmail });

        
        if(!user){
            return response.json({message: 'Email e/ou Senha Errados'})
        } else{

            const { password } = user;

            if(password === inputPassword ) {
            return response.json({message: 'Usuario pode logar'});
            
            }else {
                return response.json({ message: 'Email e/ou Senha Errados' });
            }
        }
    }
};

