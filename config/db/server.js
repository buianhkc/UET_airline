var mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path:"./.env"});

async function connect() {
    var con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!!!")
    });
} 


module.exports = { connect };