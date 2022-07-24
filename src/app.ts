//
//console.log("express + TS");

import express, { Request, Response } from 'express';
import { exit } from 'process';
const bodyParser = require('body-parser');
// const db = require("./db/database");
const cors = require('cors');
var mysql = require("mysql")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createPool({
    host: 'mateusnobre.com', // O host do banco. Ex: localhost
    user: 'epsjodbb_mateus', // Um usuário do banco. Ex: user 
    password: 'mateus', // A senha do usuário. Ex: user123
    database: 'epsjodbb_reliquias' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

app.use(express.json());
// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors({
//     origin: 'http://localhost:3333',
//     optionsSuccessStatus: 200, 
//     methods: "GET, PUT"
// }));
app.use(cors());

app.get("/", async function (req, res) {

    return res.send("Hello Express!");
});

app.get("/api/getreliquias", async function (req, res) {
    // let reliquias = await db.getReliquias();
    // console.log("Reliquias: ", reliquias);
    // return res.send(reliquias);
    console.log('chegou');
    connection.query('SELECT * FROM reliquias', (err: any, results: any) => {
       // connection.query('SELECT * FROM reliquias', (err, results) => {
        let r;
        let a;
        if (err) {
            r = results; //results.sendStatus(500).send(err);
            a = results;
            console.log('r n ');
            return r;
        }
        else {
            a = results; // results.send(results);
            // r = results.status(200);
            //  res.status(500).json({error: 'an error occurred'});
            // funciona r =  res.status(200).json({ok: 'ok'});
            r = res.status(200).send(a);
            console.log('r s');
            return r;
        }
        return r;
    })
});

// app.post("/api/adicionarReliquias", async function (req, res) {
//     console.log('req: ', req.body);
//     let reliquias = await db.adicionarReliquias(req.body);
//     //  console.log("Reliquias: ", reliquias);
//     if (reliquias) {
//         return res.sendStatus(200);
//     } else {
//         return res.sendStatus(404);
//     }
//     //  return res.sendStatus(200)
// });

app.listen(3333, () => {
    console.log("Aplicação de TS + Express funcionando!");
});