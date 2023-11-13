var mysql = require('mysql');

async function connect() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "uet_airline"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!!!")
    });
} 


module.exports = { connect };