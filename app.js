const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const helmet = require("helmet")

const userRoutes = require('./routes/user');

const app = express();

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res, next) => {
  posts.find()
    .then(teddies => res.status(200).json(teddies))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/user', userRoutes); 

module.exports = app;