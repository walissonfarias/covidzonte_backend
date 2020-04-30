const admin = require ('./middlewares/firebase.js');
module.exports = {
    async isAuth(request, response,next) {
        const res = {ok: false};
        const usuariosAuth = admin.auth();
        const idToken = (request.headers.authorization && request.headers.authorization.split(" ")[1]) || null;
        if (idToken){
            usuariosAuth
            .verifyIdToken(idToken)
            .then(decodedToken=> {
                 request.uid = decodedToken.uid;
                 next();
            }).catch(err=>{
                    console.log("Sem permissão");
                    return response.send ({res});
                 }) 
        }
    }
};

