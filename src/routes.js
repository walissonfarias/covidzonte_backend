const {Router} = require ('express');
const UpdateController = require('./controller/UpdateController');
const RegisterController = require('./controller/RegisterController');
const DeleteCotroller = require('./controller/DeleteController');
const LoginController = require('./controller/LoginController');

const projectController = require('./controller/projectController');

const authMiddleware = require('./middlewares/auth');


const routes = Router();



routes.post('/register', RegisterController.store);
routes.get('/login', LoginController.login);
/*
routes.use(authMiddleware);
*/

routes.put('/update', UpdateController.update);
routes.delete('/delete', DeleteCotroller.delete);


routes.get('/projectController', projectController.projectController);


module.exports = routes;