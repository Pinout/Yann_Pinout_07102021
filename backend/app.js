const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const helmet = require("helmet")
const cors = require('cors');
const stack = require('stack');

const userRoutes = require('./routes/user');

const app = express();

const db = require("./models");
//db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/

// Sécurité
app.use(bodyParser.json());
app.use(helmet());


app.use(stack());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
}); 
app.post('/', function(req, res) {
    res.send('Hello Sir')
})

module.exports = app;