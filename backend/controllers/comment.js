const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.getAllComments = (req, res) => {
  Comment.findAll({ order: [['updatedAt', 'DESC']] })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res) => { 
    if (!req.body.content) { return res.status(400).json({ error: "Remplissez tous les champs" }); }
    Comment.create({
        authorId: req.body.authorId,
        postId: req.body.postId,
        author: req.body.author,
        content: req.body.content
    })
        .then(() => res.status(201).json({ message: "Commentaire créé" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch(error => res.status(500).json({ error }));
};
exports.deleteComments =(req, res) => {
    Comment.findAll({ where: { postId: req.params.id} })
        .then(comments => {
            Comment.destroy()
                .then(() => res.status(200).json({ message: "Commentaires supprimés" }))
                .catch(error => res.status(500).json({ error }));
        })
}
exports.modifyComment = (req, res, next) => {
    Comment.findOne({ where : {id: req.params.id }}) 
        .then(comment => {
            Comment.update({ content: req.body.content })
            .then(() => res.status(200).json({ message: "Commentaire modifié" }))
            .catch(error => res.status(400).json({ error }));
        })
};