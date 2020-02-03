const express = require("express");
const router = express.Router();
const toolService = require("../service/ToolService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/all", toolService.getAllTool);

module.exports = router;
