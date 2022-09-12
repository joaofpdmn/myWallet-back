import express from 'express';
import cors from 'cors';
import { createAccount } from './controllers/signup.controller.js';
import { loginAccount } from './controllers/login.controller.js';
import { getItens } from './controllers/itens.controller.js';
import { createEntry } from './controllers/entry.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', createAccount);

app.post('/login', loginAccount);

app.get('/itens', getItens);

app.post('/entry/:id', createEntry);

app.listen(5000, () => { console.log('Ouvindo') });