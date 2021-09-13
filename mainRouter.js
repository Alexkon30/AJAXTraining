import Router from 'express';
import mainController from './mainController.js';

const mainRouter = new Router();

mainRouter.post('/register', mainController.create)
//mainRouter.get('/register', mainController.registerForm)
mainRouter.get('/', mainController.welcome)
mainRouter.post('/', mainController.check)
mainRouter.get('/logout', mainController.out)

export default mainRouter;
