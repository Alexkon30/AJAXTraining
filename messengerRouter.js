import Router from 'express';
import messengerController from './messengerController.js';

const messengerRouter = new Router();

messengerRouter.get('/', messengerController.main);
messengerRouter.get('/:id', messengerController.getChat);
messengerRouter.post('/', messengerController.sendMessage)



export default messengerRouter;
