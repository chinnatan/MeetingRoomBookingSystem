const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
const http = require('http').Server(app);

const NAME = config.SERVER.NAME
const PORT = process.env.PORT || config.SERVER.PORT;
const HOST = config.SERVER.HOST;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const roomController = require("./src/controller/RoomController");
app.use("/", roomController);

http.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);