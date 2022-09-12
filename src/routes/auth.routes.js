import express from 'express';  
import { loginAccount } from '../controllers/login.controller.js';
import { createAccount } from '../controllers/signup.controller.js';

const authRouter = express.Router();

authRouter.post('/login', loginAccount);
authRouter.post('/signup', createAccount);

export { authRouter };
