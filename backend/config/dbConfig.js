const dotenv = require("dotenv");
dotenv.config({path: '../.env'}); 
const NAME = process.env.NAME;
const PASS = process.env.PASS;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

module.exports = {
    HOST: HOST,
    USER: NAME,
    PASSWORD: PASS,
    PORT: PORT,
    DB: 'groupomania',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};