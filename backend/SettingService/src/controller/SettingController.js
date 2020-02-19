const express = require("express");
const router = express.Router();
const settingService = require("../service/SettingService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", settingService.getSetting);
router.put("/update", settingService.updateSetting);

module.exports = router;