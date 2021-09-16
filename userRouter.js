import Router from 'express';
import userController from './userController.js';

const userRouter = new Router();

userRouter.get('/', userController.main);
userRouter.get('/people', userController.people);
userRouter.get('/getSettings', userController.getSettings);
userRouter.get('/getMessages', userController.getMessages);
userRouter.post('/setSettings', userController.setSettings);
userRouter.get('/deleteUser', userController.deleteUser);
userRouter.get('/people/:id', userController.getUserPage);
userRouter.get('/people/add/:id', userController.addToFriends);


export default userRouter;
