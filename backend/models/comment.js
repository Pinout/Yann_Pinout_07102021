module.exports = (sequelize, Sequelize) => {

    const Comment = sequelize.define("comment", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorId: {type: Sequelize.INTEGER},
        postId: {type: Sequelize.INTEGER},
        author: {type: Sequelize.STRING},
        content: {type: Sequelize.TEXT},
    });
    return Comment;
};