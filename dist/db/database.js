"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  } // const mysql = require("mysql2/promise");


  const mysql = require("mysql"); // const connection = await mysql.createConnection({
  //     host: 'localhost', // O host do banco. Ex: localhost
  //     user: 'root', // Um usuário do banco. Ex: user 
  //     password: '', // A senha do usuário. Ex: user123
  //     database: 'ageofmythology' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
  // });
  // const connection = await mysql.createConnection({
  //     host: 'mateusnobre.com', // O host do banco. Ex: localhost
  //     user: 'epsjodbb_mateus', // Um usuário do banco. Ex: user 
  //     password: 'mateus', // A senha do usuário. Ex: user123
  //     database: 'epsjodbb_reliquias' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
  // });


  const connection = await mysql.createPool({
    host: 'mateusnobre.com',
    // O host do banco. Ex: localhost
    user: 'epsjodbb_mateus',
    // Um usuário do banco. Ex: user 
    password: 'mateus',
    // A senha do usuário. Ex: user123
    database: 'epsjodbb_reliquias' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql

  });
  console.log('Conectou ao MySQL');
  global.connection = connection;
  return connection;
}

async function getReliquias() {
  // const conn = await connect();
  // const [rows] = await conn.query('SELECT * FROM reliquias');
  // return rows;
  const conn = global.connection.query('SELECT * FROM reliquias', (err, results) => {
    if (err) results.sendStatus(500).send(err);else results.send(results);
    return results;
  });
}

async function adicionarReliquias(reliquia) {
  const conn = await connect();
  const sql = `INSERT INTO reliquias (nome, descricao, imagem, created_at, updated_at) VALUES (?, ?, ?, ?, ?);`;
  const values = [reliquia.nome, reliquia.descricao, reliquia.imagem, reliquia.created_at, reliquia.updated_at];

  if (await conn.query(sql, values)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getReliquias,
  adicionarReliquias
};