import db from '../database/db.js';

async function getItens(req, res) {
    const user = res.locals.user;
    const { id } = req.params;
    if (user) {
        try {
            const itens = await db.collection('itens').find({userId: user._id}).toArray();
            res.send(itens);
        } catch (error) {
            res.status(500).send('Não conseguimos pegar os itens');
        }
    }
    return;
}

export { getItens };