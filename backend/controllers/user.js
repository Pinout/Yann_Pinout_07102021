const db = require("../models/sequelizeModel.js");
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const Sequelize = db.Sequelize;
const { users } = db.users;
const User = require('../models/user');

const schema = new passwordValidator;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

/*schema
.is().min(7)
.is().max(100)
.is().not().oneOf(['0000000']);*/

//Inscription
exports.signup = (req, res) => {
    if (emailValidator.validate(req.body.email)) {
        //if(schema.validate(req.body.password)) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    };
                    User.create(user)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Tutorial."
                      });
    });
                    })
                .catch(error => res.status(500).json({ error }));
        /*} else {
            res.status(401).json({ error: "Le mot de passe doit contenir au minimum 7 caractères" });
        }*/
    } else {
        res.status(401).json({ error: "E-mail non valide" });
    }
};

//Connexion
exports.login = (req, res) => {
    if (schema.validate(req.body.password)) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ error: "Mot de passe incorrect" });
                            } else {
                                res.status(200).json({ 
                                    email: user.email,
                                    token: jwt.sign({ email: user.email}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }) 
                                });
                            }
                        })
                        .catch(error => res.status(500).json({ error }));
                } else {
                    res.status(401).json({ error: "Connexion refusée" });
                }
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
    }
};
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
};


exports.getAllUsers = (req, res, next) => {
  User.findAll()
        .then((users) => res.status(200).json(users))
        console.log(users)
        .catch(error => res.status(400).json({ error }));
}