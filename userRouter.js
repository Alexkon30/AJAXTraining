import Router from 'express';
import userController from './userController.js';

const userRouter = new Router();

userRouter.get('/', userController.main)

export default userRouter;