const express = require("express");
const router = express.Router();
const bookingService = require("../service/BookingService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/room/all", bookingService.getAllRoom);
router.get("/room/:roomid", bookingService.getRoomById);

module.exports = router;
