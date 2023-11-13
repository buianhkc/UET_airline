// get the client
const mysql = require('mysql2/promise');

// create the connection
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'uet_airline'
});

module.exports = connection;