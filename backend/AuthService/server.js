const express = require('express');
const bodyParser = require('body-parser')
const config = require("./config");

const app = express();

// Auth Address
const NAME = config.SERVER.NAME
const PORT = process.env.PORT || config.SERVER.PORT;
const HOST = config.SERVER.HOST;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authController = require('./src/controller/AuthController')
app.use("/", authController);

app.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);