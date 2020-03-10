const express = require("express");
const router = express.Router();
const BookingService = require("../service/BookingService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/send", BookingService.addBooking);
router.post("/admin/summary", BookingService.summaryBooking);

router.put("/update", BookingService.editBooking);
router.put("/cancel", BookingService.cancelBooking);

router.get("/user/:userId", BookingService.getBookingByUserId);
router.get("/:bookingId", BookingService.getBookingByBookingId);

module.exports = router;
