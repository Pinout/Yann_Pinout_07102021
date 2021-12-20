const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.getAllPosts = (req, res) => {
  Post.findAll({ })
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
exports.getPostById = (req, res) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(500).json({ error }));
};
exports.createPost = (req, res) => { 
    if (!req.body.title || !req.body.content) { // need title + content
        return res.status(400).json({ error: "Remplissez les champs titre et contenu" });
    }
    Post.create({
    	title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imgUrl: req.body.imgUrl
    })
        .then(() => res.status(201).json({ message: "Nouveau post créé" }))
        .catch(error => res.status(400).json({ error }));
};
exports.deletePost = (req, res) => {
    Post.destroy({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch(error => res.status(500).json({ error }));
};
