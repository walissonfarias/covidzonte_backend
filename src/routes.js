const { Router } = require('express');

const UserController = require('./controller/UserController');

const isAuth = require('./middlewares/isAuth');

const routes = Router();

routes.get('/user/:id', isAuth, UserController.index);
routes.post('/register', UserController.store);
routes.put('/user/:id', isAuth, UserController.update);
routes.delete('/user/:id', isAuth, UserController.destroy);

module.exports = routes;
