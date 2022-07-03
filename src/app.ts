//
//console.log("express + TS");

import express, { Request, Response } from 'express';
import { exit } from 'process';
const bodyParser = require('body-parser');
const db = require("./db/database");
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    return res.send("Hello Express!");
});

app.get("/api/getReliquias", async function (req, res) {
    let reliquias = await db.getReliquias();
    console.log("Reliquias: ", reliquias);
    return res.send(reliquias);
});

app.post("/api/adicionarReliquias", async function (req, res) {
    console.log('req: ', req.body);
    let reliquias = await db.adicionarReliquias(req.body);
    console.log("Reliquias: ", reliquias);
    if (reliquias) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
  //  return res.sendStatus(200)
});

app.listen(3333, () => {
    console.log("Aplicação de TS + Express funcionando!");
});