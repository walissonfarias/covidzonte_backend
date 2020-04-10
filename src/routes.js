const {Router} = require ('express');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/login', LoginController.login);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

module.exports = routes;