module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define("post", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        author: {type: Sequelize.INTEGER},
        title: {type: Sequelize.STRING},
        content: {type: Sequelize.TEXT},
        imageUrl: {type: Sequelize.STRING},
        likes: {type: Sequelize.INTEGER}
    });
    return Post;
};