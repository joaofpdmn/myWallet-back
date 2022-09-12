import db from './db.js';

 async function getItens(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Problema com token!');
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.status(401).send('Problema com sessão!');
    }
    const user = await db.collection("users").findOne({
        _id: session.userId
    })
    if (user) {
        db.collection('itens').find({}).toArray().then(data => {
            res.send(data);
        }).catch((e) => { console.log(e) });
    }
}

export { getItens };