const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

const schema = new passwordValidator;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

/*schema
.is().min(7)
.is().max(100)
.is().not().oneOf(['0000000']);*/ 
/*exports.signup = (req, res, next) => {
    const newuser = {
        username: req.body.username,
        email: req.body.email, 
        password : req.body.password 
    }
    User.create(newuser)
    .then((newuser) => { 
        console.log(newuser) 
        res.status(201).json({ message: 'Utilisateur créé !' }) 
    });
};*/
//Inscription
exports.signup = (req, res, next) => {
      User.findOne({
        attributes: ['username','email','password'],
        where: { email: req.body.email }
        }) //On vérifie si un utilisateur ne correspond pas à un email de la BDD
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
     User.findOne({ 
        attributes: ["email","password"],
        where : {email: req.body.email }}) 
        .then(user => {
            if (!user) { 
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }
            bcrypt.compare(req.body.password, user.password) 
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    } else {
                        res.status(200).json({ // Si comparaison ok, on renvoit un objet JSON contenant //
                        userId: user.id, // L'userId + //
                        token: jwt.sign( // Un token - Fonction sign de JsonWebToken//
                            { userId: user.id }, // 1er argument : données à encoder //
                            'RANDOM_TOKEN_SECRET', // 2ème : clé secrète encodage //
                            { expiresIn: '24h' }// 3ème :argument de configuration //
                        ),
                        //isAdmin: user.isAdmin // Rajout Admin //
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })

        .catch(error => res.status(500).json({ error }));
}

// Delete User
exports.deleteUser = (req, res, next) => {
     User.findOne({ where: { email: req.body.email } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    res.status(400).json({ error: "Mot de passe incorrect" });
                    } else {
                        User.destroy({ where: { email: req.body.email } })
                            .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ error }))
        })
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
        where: { username: req.params.username }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};
