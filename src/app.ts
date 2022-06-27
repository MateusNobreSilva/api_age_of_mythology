//
//console.log("express + TS");

import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');
const db = require("./db/database");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());


app.get("/", (req, res) => {
    return res.send("Hello Express!");
});

app.get("/api/getReliquias", async function (req, res)  {
    
    let reliquias = await db.getReliquias();
    console.log("Reliquias: ", reliquias);
    return res.send(reliquias);
    
});


app.listen(3000, () => {
    console.log("Aplicação de TS + Express funcionando!");
});