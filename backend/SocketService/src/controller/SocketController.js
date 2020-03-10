const express = require("express");
const router = express.Router();
const SocketService = require("../service/SocketService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/booking", SocketService.triggerAddBooking);
router.get("/room/{roomid}/door/on", SocketService.triggerOpenDoor)

module.exports = router;
