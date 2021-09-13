import Router from 'express';
import userController from './userController.js';
import mongoose from 'mongoose';

const userRouter = new Router();

userRouter.get('/', userController.main)

export default userRouter;
