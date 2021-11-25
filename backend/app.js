const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const helmet = require("helmet")
const cors = require('cors');

const userRoutes = require('./routes/user');


const app = express();

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.static('../frontend/public'));
express.static('public')

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/user', userRoutes); 

module.exports = app;