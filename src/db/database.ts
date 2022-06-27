
declare global {
    var connection: any; // 👈️ disables type checking for property
    function sum(a: number, b: number): number;
}
export {};

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: 'localhost', // O host do banco. Ex: localhost
        user: 'root', // Um usuário do banco. Ex: user 
        password: '', // A senha do usuário. Ex: user123
        database: 'ageofmythology' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    });
    console.log('Conectou ao MySQL');
    global.connection = connection;
    return connection;
}


async function getReliquias() {
   
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM reliquias');
    
    return rows;
}

module.exports = { getReliquias }


