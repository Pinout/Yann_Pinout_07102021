module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define("post", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorId: {type: Sequelize.INTEGER},
        author: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        content: {type: Sequelize.TEXT},
        imgUrl: {type: Sequelize.STRING}
    });
    return Post;
};