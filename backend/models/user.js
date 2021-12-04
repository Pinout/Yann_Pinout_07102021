//const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        isAdmin: { type: Sequelize.INTEGER },
        imgProfil: { type: Sequelize.STRING }
    });
    return User;
};