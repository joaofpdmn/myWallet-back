import express from 'express';
import cors from 'cors';
import { createAccount } from './signup.controller.js';
import { loginAccount } from './login.controller.js';
import { getItens } from './itens.controller.js';
import { createEntry } from './entry.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', createAccount);

app.post('/login', loginAccount);

app.get('/itens', getItens);

app.post('/entry/:id', createEntry);

app.listen(5000, () => { console.log('Ouvindo') });