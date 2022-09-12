import db from "../database/db.js";

async function userAuth(req, res, next){
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
    if(!user){
        res.sendStatus(401);
        return;
    }
    res.locals.user = user;
    next();
}

export { userAuth };