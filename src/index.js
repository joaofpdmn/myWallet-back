import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import Joi from 'joi';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
dayjs.extend(customParseFormat);

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

function timeCalculator() {
    return dayjs().format("DD/MM");
}

mongoClient.connect().then(() => {
    db = mongoClient.db("mywallet");
});

app.post('/signup', async (req, res) => {
    const { name, email, password, repeatPassword } = req.body;
    const emailCheck = await db.collection('users').findOne({ email: email });

    if (emailCheck) { return res.sendStatus(409); }
    if (password !== repeatPassword) { return res.sendStatus(422); }

    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash);
    const schema = Joi.object({
        name: Joi.string().min(1).required().trim(),
    });
    try {
        const validate = await schema.validateAsync({ name });
        await db.collection('users').insertOne({ name, email, password: passwordHash });
    } catch (error) {
        return res.sendStatus(422);
    }
    return res.sendStatus(201);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).send('Usuário ou senha não encontrado!');
        }
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.send(500);
    }
});

app.get('/itens', async (req, res) => {
    db.collection('itens').find().toArray().then(data => {
        res.send(data);
    }).catch((e) => { console.log(e) });
});

app.post('/entry/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    let { price, name } = req.body;
    try {
        if (id === "saida") {
            price *= -1;
        }
        await db.collection('itens').insertOne({ price: Number(price), name: name, date: timeCalculator() });
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(422);
    }
});











app.listen(5000, () => { console.log('Ouvindo') });