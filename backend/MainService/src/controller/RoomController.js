const express = require("express");
const router = express.Router();
const roomService = require("../service/RoomService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/all", roomService.getAllRoom);
router.get("/:roomid", roomService.getRoomById);
router.get("/name/:roomname", roomService.getRoomByName);
router.get("/floor/:roomfloor", roomService.getRoomByFloor);
router.get("/:roomid/booking", roomService.getRoomBookingStatusById);

module.exports = router;
