module.exports = (sequelize, Sequelize) => {

    const Comment = sequelize.define("comment", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorId: {type: Sequelize.INTEGER},
        author: {type: Sequelize.STRING},
        authorImg: {type: Sequelize.STRING},
        postId: {type: Sequelize.INTEGER},
        content: {type: Sequelize.TEXT},
    });
    return Comment;
};