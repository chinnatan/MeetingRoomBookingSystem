const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// Auth Address
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0';

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authController = require('./src/controller/AuthController')
app.use("/auth/", authController);

app.listen(PORT, HOST);
console.log(`Auth Service Running on http://${HOST}:${PORT}`);