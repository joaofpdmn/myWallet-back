import Joi from 'joi';
import bcrypt from 'bcrypt';
import db from '../database/db.js';


async function createAccount(req, res){
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
}

export { createAccount };