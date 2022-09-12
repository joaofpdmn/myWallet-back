import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { itensRouter } from './routes/itens.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(itensRouter);

app.listen(5000, () => { console.log('Ouvindo') });