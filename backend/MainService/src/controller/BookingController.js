const express = require("express");
const router = express.Router();
const BookingService = require("../service/BookingService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/send", BookingService.increaseBooking);
router.get("/:roomid", BookingService.getRoomById);
router.get("/floor/:roomfloor", BookingService.getRoomByFloor);
router.get("/status/:roomid", BookingService.getRoomStatusById);

module.exports = router;
