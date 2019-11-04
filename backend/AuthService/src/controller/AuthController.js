const express = require("express")
const router = express.Router();
const authService = require("../service/AuthService")

var bodyParser = require('body-parser')

// parse application/json
router.use(bodyParser.urlencoded({ extended : true }));
router.use(bodyParser.json());

router.get("/login", authService.login);

module.exports = router;