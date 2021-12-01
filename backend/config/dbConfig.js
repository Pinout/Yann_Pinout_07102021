const dotenv = require("dotenv");
dotenv.config({path: '../.env'}); 
const USER = process.env.USER;
const PASS = process.env.PASS;
const HOST = process.env.HOST;

module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASS,
    DB: 'groupomania',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Temps max d'attente avant de renvoyer une erreur (en ms)
        idle: 10000    // Temps max avant de libérer une connexion pour inactivité (en ms)
    }
};