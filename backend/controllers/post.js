const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const db = require("../models");
const Post = db.posts;
const Comment = db.Comment;
const Op = db.Sequelize.Op;

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.getAllPosts = (req, res) => {
  Post.findAll({ order: [['updatedAt', 'DESC']] })
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
exports.getPostsByAuthorId = (req, res) => {
    Post.findAll({ where: { authorId: req.params.id}, order: [['updatedAt', 'DESC']] })
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(400).json({ error }));
};
exports.createPost = (req, res) => { 
    if (!req.body.title || !req.body.content) { // need title + content
        return res.status(400).json({ error: "Remplissez les champs titre et contenu" });
    }
    if(req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else { 
        imageUrl = null;
    }
    Post.create({
        authorId: req.body.id,
    	title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imgUrl: imageUrl
    })
        .then(() => res.status(201).json({ message: "Nouveau post créé" }))
        .catch(error => res.status(400).json({ error }));
};
exports.deletePost = (req, res) => {
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch(error => res.status(400).json({ error }));
};
exports.modifyPost = (req, res, next) => {
    Post.findOne({ where : {id: req.params.postId }}) 
        .then(post => {
            if(req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            } else { 
                imageUrl = null;
            }
            Post.update({
                title: req.body.title,
                content: req.body.content,
                imgUrl: imageUrl
            })
            .then(() => res.status(200).json({ message: "Post modifié" }))
            .catch(error => res.status(400).json({ error }));
        })
};