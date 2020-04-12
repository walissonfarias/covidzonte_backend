const {Router} = require ('express');
const UpdateController = require('./controller/UpdateController');
const RegisterController = require('./controller/RegisterController');
const DeleteCotroller = require('./controller/DeleteController');
const LoginController = require('./controller/LoginController');

const routes = Router();

routes.post('/register', RegisterController.store);
routes.put('/update', UpdateController.update);
routes.get('/login', LoginController.login);
routes.delete('/delete', DeleteCotroller.delete);

module.exports = routes;