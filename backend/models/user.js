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
        isAdmin: { type: Sequelize.BOOLEAN },
        imgProfil: { type: Sequelize.STRING }
    });
    /*User.create ({
        username: "admin",
        email: "admin@outlook.fr",
        password: "admin",
        isAdmin: true
    });*/
    return User;
};

