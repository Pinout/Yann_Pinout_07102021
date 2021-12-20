const dbConfig = require("../config/dbConfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
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
db.posts = require("./post.js")(sequelize, Sequelize);

//db.sequelize.sync(); // auto query to the database

sequelize.authenticate().then(() => {
   console.log('Connexion établie');
}).catch(err => {
   console.error('Pas de connexion :', err);
});
db.sequelize.sync({ force: true }).then(() => {
  db.users.create ({
        username: "admin",
        email: "admin@outlook.fr",
        password: "admin",
        isAdmin: true
    });
  console.log("Drop and re-sync db.");
});
module.exports = db;