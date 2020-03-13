const express = require("express");
const router = express.Router();
const toolService = require("../service/ToolService");

var bodyParser = require("body-parser");

// parse application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/all", toolService.getAllTool);
router.get("/:roomid", toolService.getToolByRoomId);
router.get("/report/:userid", toolService.getToolReportByUserId);
router.get("/report/room/name/:userid", toolService.getRoomNameForReportToolByUserId);
router.get("/report/tool/name/:roomAccessId", toolService.getToolNameForReportToolByRoomAccessId);

router.post("/report/send", toolService.sendReportTool);

module.exports = router;
