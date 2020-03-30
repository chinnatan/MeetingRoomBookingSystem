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
router.get("/report/id/:reportId", toolService.getToolReportByReportId);
router.get("/report/room/name/:userid", toolService.getRoomNameForReportToolByUserId);
router.get("/report/tool/name/:roomAccessId", toolService.getToolNameForReportToolByRoomAccessId);

router.post("/report/send", toolService.sendReportTool);
router.post("/report/admin/summary", toolService.summaryReportToolProblem);
router.post("/report/all", toolService.getAllToolReport);
router.post("/report/update", toolService.updateReportStatus);
router.post("/report/call/staff", toolService.callStaff);

module.exports = router;
