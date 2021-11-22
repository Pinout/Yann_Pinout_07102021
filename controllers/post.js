const jwt = require('jsonwebtoken');
const db = require('../mysqlConnect');
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const fs = require('fs'); 



/* --  CREATE  -- */

exports.createPost = (req, res, next) => {
    console.log("début création post");
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_USER); 
    const userId = decodedToken.user_id;
    console.log('userId : '+ userId)

    //On ajoute une étape car le frontend ne sait pas quel est l'Url de l'image 
    //car c'est notre middleware multer qui a généré le fichier
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log("imageUrl : " + imageUrl);
    const bindings = {
        user_id: userId,
        title: req.body.title,
        content: req.body.content,
        attachement: imageUrl,
        publication: new Date()
    }
    const sqlQuery = "INSERT INTO `posts` SET ?"
    const preparedStatement = db.format(sqlQuery, [bindings])
    db.query(preparedStatement, (error, result, field) => {
        if (error) {
        return res.status(400).json({ error })
        }
        return res.status(201).json({ message: 'Votre post a été créé !' })
    }) 
    console.log("insertion post réussie");
};


/* --  MODIFY  -- */

exports.modifyPost = (req, res, next) => {
    const content = req.body.newText
    const id = req.body.postId
    console.log('nouveau texte "' + content + '" pour le post ' + id)
    db.query(
        `UPDATE posts SET content= ? WHERE id= ?`, [ content, id ],
        (error, results, fields) => {
            if (error) {
            return res.status(400).json(error)
            }
            return res.status(200).json({ message: 'Votre post a bien été modifié !' })
        } 
    )
    console.log("modification post numero " + id + " - ok");
};


/* --  DELETE  -- */


exports.deletePost = (req, res, next) => {

    //récupération de l'Url de l'image à supprimer
    db.query( 'SELECT attachement FROM posts WHERE id=? ',
    req.body.postId,  
    (error, result, field) => {
        if (error) {
            console.log('erreur 1 '+error )
            return res.status(400).json({ error })
        }
        const filename = result[0].attachement.split('/images/')[1];       

        // appel d'une fonction du package 'fs' : unlink sert a supprimer l'image
        fs.unlink(`images/${filename}`, () => {

        db.query(
            'DELETE FROM posts WHERE id=?', 
            req.body.postId, 
            (error, result, fields) => {
                if (error) {
                    return res.status(400).json(error)
                }            
                console.log('suppression d un post spécifique - ok')
                return res.status(200).json({ message: 'Votre post a bien été supprimé !' })
            }
        )
    })
})

};

//récupérer tous les posts
exports.getAllPost = (req, res, next) => {
    db.query('SELECT * FROM posts  ORDER BY publication DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({ error })
        }
        console.log('récupération de tous les posts : ok')
        return res.status(200).json(result)
    })
};