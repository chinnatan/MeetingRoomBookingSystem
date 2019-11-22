const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Booking Option
const NAME = "Main Service";
const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const roomController = require("./src/controller/RoomController");
app.use("/room", roomController);

app.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);
