const express = require("express")
const router = express.Router();
const authService = require("../service/AuthService")

var bodyParser = require('body-parser')

// parse application/json
router.use(bodyParser.urlencoded({ extended : true }));
router.use(bodyParser.json());

router.post("/login", authService.login);

router.post("/user/all", authService.getAllUser);
router.post("/user/ban", authService.banned);
router.post("/user/unban", authService.unbanned);

module.exports = router;