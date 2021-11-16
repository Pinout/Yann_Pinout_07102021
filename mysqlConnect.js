const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config({path: '/.env'}); 
const NAME = process.env.NAME;
const PASS = process.env.PASS;
const HOST = process.env.HOST;

const db = mysql.createConnection({
    host     : HOST,
    user     : NAME,
    password : PASS,
    database: 'groupomania'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté a mysql avec l \'id '  + db.threadId);
});

module.exports = db;