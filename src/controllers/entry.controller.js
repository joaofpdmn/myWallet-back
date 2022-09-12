import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import db from '../database/db.js';

async function createEntry(req, res){
    function timeCalculator() {
        return dayjs().format("DD/MM");
    }
    dayjs.extend(customParseFormat);
    
    const { id } = req.params;
    let { price, name, email } = req.body;
    Number(price);
    try {
        if (id === "saida") {
            price *= -1;
        }
        await db.collection('itens').insertOne({ price: Number(price), name: name, date: timeCalculator(), email: email });
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(422);
    }
}

export { createEntry };