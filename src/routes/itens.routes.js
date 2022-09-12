import express from 'express';
import { getItens } from '../controllers/itens.controller.js';
import { createEntry } from '../controllers/entry.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const itensRouter = express.Router();
itensRouter.use(userAuth);

itensRouter.get('/itens', getItens);
itensRouter.post('/entry/:id', createEntry);

export { itensRouter }; 
