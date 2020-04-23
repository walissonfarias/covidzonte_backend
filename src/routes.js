const {Router} = require ('express');
const UpdateController = require('./controller/UpdateController');
const RegisterController = require('./controller/RegisterController');
const DeleteCotroller = require('./controller/DeleteController');
const LoginController = require('./controller/LoginController');
const CoordinatesController = require('./controller/CoordinatesController')

const projectController = require('./controller/projectController');

const authMiddleware = require('./middlewares/auth');


const routes = Router();


routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.login);
/*
routes.use(authMiddleware);
*/
routes.put('/',CoordinatesController.updateCoordinates);  //essa rota atualiza somente as coordenadas do usuário
routes.put('/update', UpdateController.update);
routes.delete('/delete', DeleteCotroller.delete);


routes.get('/projectController', projectController.projectController);


module.exports = routes;