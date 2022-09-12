import bcrypt from 'bcrypt';
import db from '../database/db.js';
import { v4 as uuid } from 'uuid';

async function loginAccount(req, res){
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).send('Usuário ou senha não encontrado!');
        }
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        });
        user.token = token;
        await db.collection('users').updateOne({ _id: user._id }, { $set: user });

        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.send(500);
    }
}

export { loginAccount };