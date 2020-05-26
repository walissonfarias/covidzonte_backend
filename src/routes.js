const { Router } = require('express');

const CoordinatesController = require('./controller/CoordinatesController');
const UserController = require('./controller/UserController');
const AuthController = require('./controller/AuthController');

const isAuth = require('./middlewares/isAuth');

const routes = Router();

routes.get('/', isAuth, CoordinatesController.index);

routes.post('/register', UserController.store);

routes.post('/login', AuthController.login);
routes.post('/logout', isAuth, AuthController.logout);

module.exports = routes;
