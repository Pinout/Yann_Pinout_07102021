const emailValidator = require('email-validator');

const db = require("../models");
const User = db.users;
const Post = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

//Inscription
exports.signup = (req, res, next) => {
      User.findOne({where: { email: req.body.email }}) //On vérifie si un utilisateur ne correspond pas à un email de la BDD
        .then((user) => {
            if (!user) 
            {
                bcrypt.hash(req.body.password, 10)  //Fonction pour hasher un mot de pass (fonction async)
                    .then(hash => { 
                        console.log(hash)           
                         const newUser = User.create ({
                            username: req.body.username,
                            email: req.body.email, 
                            password : hash
                        })
                        .then((user) => { 
                            console.log(user) 
                            res.status(201).json({ message: 'Utilisateur créé !' })
                        });
                    })
                        .catch(error => res.status(400).json({ message: 'Erreur pendant la création' }));
            }
        })
        .catch(error => res.status(500).json({ message: 'Utilisateur déjà existant' }));
};

//Connexion
exports.login = (req, res) => {
     User.findOne({ where : {email: req.body.email }}) 
        .then(user => {
            if (!user) { 
                 res.status(401).json({ error: 'Utilisateur inconnu !' });
            }
           bcrypt.compare(req.body.password, user.password, function(err, results){
                if(err){
                    throw new Error(err)
                 }
                if (results) {
                    var admin = new Boolean(false);
                    if(user.isAdmin == true) { admin = true;} else { admin = false;}
                    res.status(200).json({ 
                        userId: user.id,
                        username: user.username,
                        email: user.email,
                        isAdmin: admin, 
                        imgProfil: user.imgProfil,
                        token: jwt.sign( { userId: user.id },'RANDOM_TOKEN_SECRET', { expiresIn: '24h' } )
                        });
                } else {
                     res.status(401).json({ msg: "Invalid credencial" })
                }
                })
        })

        .catch(error => res.status(500).json({ error }));
}

exports.modifyUser = (req, res, next) => {
        bcrypt.hash(req.body.password, 10) 
            .then(hash => { 
                User.update(
                {
                    username: req.body.username,
                    password: hash,
                },
                    { where : {id: req.params.id}}
                )
            })
        .then(() => res.status(200).json({ message: "Profil modifié" }))
        .catch(error => res.status(400).json({ error }));
                Post.update(
                    {
                        author: req.body.username,
                    },
                        { where : {authorId: req.params.id}}
                    )
                    .then(() => res.status(200).json({ message: "Post modifié" }))
                    .catch(error => res.status(400).json({ error }));
                Comment.update(
                    {
                        author: req.body.username,
                    },
                        { where : {authorId: req.params.id}}
                    )
                    .then(() => res.status(200).json({ message: "Commentaire modifié" }))
                    .catch(error => res.status(400).json({ error }));
}

// Delete User
exports.deleteUser = (req, res, next) => {
    User.destroy({ where: {id : req.params.id} })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
        .catch(error => res.status(500).json({ error }));               
}


exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: ["id", "username", "email", "isAdmin", "imgProfil"]}) // Attributs à afficher
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}
exports.getOneUser = (req, res, next) => {
    User.findOne({ 
        attributes: ["id", "username", "email", "isAdmin", "imgProfil"], // Attributs à afficher
        where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
}
exports.addImg = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (req.file) {
                newimgProfil = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                if (user.imgProfil) {
                    const filename = user.imgProfil.split('/images/')[1]; // Récupère le nom du fichier dans l'URL de l'image
                    fs.unlink(`images/${filename}`, () => { // Supprime l'image correspondante
                    })
                }
            }
            User.update(
                {
                    imgProfil: newimgProfil
                },
                { 
                    where : {id: req.params.id}
                }
            )
            .then(() => res.status(200).json({ message: "Profil modifié" }))
            .catch(error => res.status(400).json({ error }));

            Post.update(
                    {
                        authorImg: newimgProfil
                    },
                        { where : {authorId: req.params.id}}
                    )
                    .then(() => res.status(200).json({ message: "Post modifié" }))
                    .catch(error => res.status(400).json({ error }));
                Comment.update(
                    {
                        authorImg: newimgProfil 
                    },
                        { where : {authorId: req.params.id}}
                    )
                    .then(() => res.status(200).json({ message: "Commentaire modifié" }))
                    .catch(error => res.status(400).json({ error }));
        })
}
