const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); // auto query to the database

sequelize.authenticate().then(() => {
   console.log('Connexion établie');
}).catch(err => {
   console.error('Pas de connexion :', err);
});

module.exports = db;