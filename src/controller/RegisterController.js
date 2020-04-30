const User = require('../models/User');
const admin = require('../middlewares/firebase');



module.exports = {
    async store(request, response) {
        const { name, email, latitude, longitude, situation } = request.body;
        let user = await User.findOne({ email });
        const idToken = (request.headers.authorization && request.headers.authorization.split(" ")[1]);
        //console.log(user);
        admin.auth()
        .verifyIdToken(idToken)
        .then(decodedToken=> {
             const uid = decodedToken.uid;
        }).catch(err=>{
                console.log("Sem permissão");
             }) 
        if (user) {
            return response.status(400).send({ error: '_User  ready exists_' });
        } else {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            user = await User.create({
                uid: uid,
                name: name,
                //password: password,
                email: email,
                location: location,
                situation: situation,
            })
            //user.password = undefined; // deixa de mostrar a senha
        }
      
        return response.send({user});
    }
};
