const {Router} = require ('express');
const UpdateController = require('./controller/UpdateController');
const RegisterController = require('./controller/RegisterController');
const DeleteCotroller = require('./controller/DeleteController');
const LoginController = require('./controller/LoginController');
const CoordinatesController = require('./controller/CoordinatesController')
const isAuth  = require('./isAuth');
const projectController = require('./controller/projectController');

//const authMiddleware = require('./middlewares/auth');

//routes.use(isAuth);
const routes = Router();


routes.post('/register'/*isAuth.isAuth*/,RegisterController.store);
routes.post('/login', LoginController.login);
/*
routes.use(authMiddleware);
*/
routes.put('/',isAuth.isAuth,CoordinatesController.updateCoordinates);  //essa rota atualiza somente as coordenadas do usuário
routes.put('/update',isAuth.isAuth, UpdateController.update);
routes.delete('/delete',isAuth.isAuth, DeleteCotroller.delete);


routes.get('/projectController',projectController.projectController);
routes.get('/users', LoginController.index);
routes.get('/', LoginController.testHeroku);
module.exports = routes;