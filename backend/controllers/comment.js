const db = require("../models");
const Comment = db.comments;
const Post= db.posts;
const User = db.users;
const Op = db.Sequelize.Op;

exports.getAllComments = (req, res) => {
  Comment.findAll({ order: [['updatedAt', 'DESC']] })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res) => { 
    if (!req.body.content) { return res.status(400).json({ error: "Remplissez tous les champs" }); }
     User.findOne({ where: {id: req.body.authorId}})
        .then(user => {
            Comment.create({
                authorId: user.id,
                authorImg: user.imgProfil,
                postId: req.body.postId,
                author: user.username,
                content: req.body.content
            })
            .then(() => res.status(201).json({ message: "Commentaire créé" }))
            .catch(error => res.status(400).json({ error }));
        })
};

exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch(error => res.status(500).json({ error }));
};
exports.modifyComment = (req, res, next) => {
    Comment.findOne({ where : {id: req.params.id }}) 
        .then(comment => {
            Comment.update({ content: req.body.content })
            .then(() => res.status(200).json({ message: "Commentaire modifié" }))
            .catch(error => res.status(400).json({ error }));
        })
};

