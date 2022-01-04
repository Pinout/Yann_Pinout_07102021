const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const helmet = require("helmet")
const cors = require('cors');
const stack = require('stack');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

const db = require("./models");
//db.sequelize.sync();



app.use(cors()) 
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
*/

// Sécurité
app.use(bodyParser.json());
app.use(helmet());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.get('/', function(req, res){
  res.sendFile(path.join( __dirname, "../frontend/public/index.html"));
});


module.exports = app;