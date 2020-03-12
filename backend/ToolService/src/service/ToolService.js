const MySQL = require("mysql");
const Config = require("../../config.json");

const SERVICE_NAME = Config.SERVER.NAME;

// MySQL Configuration
const HOST_MYSQL = Config.MYSQL.HOST;
const PORT_MYSQL = Config.MYSQL.PORT;
const USER_MYSQL = Config.MYSQL.USERNAME;
const PASS_MYSQL = Config.MYSQL.PASSWORD;
const DATA_MYSQL = Config.MYSQL.DATABASE;
const CONNECTION_LIMIT_MYSQL = Config.MYSQL.CONNECTION_LIMIT;

// MySQL Pool Connection
var mysqlPool = MySQL.createPool({
  connectionLimit: CONNECTION_LIMIT_MYSQL,
  host: HOST_MYSQL,
  port: PORT_MYSQL,
  user: USER_MYSQL,
  password: PASS_MYSQL,
  database: DATA_MYSQL
});

// แสดงข้อมูลอุปกรณ์ทั้งหมดที่มีในฐานข้อมูล
exports.getAllTool = (req, res) => {
  const API_NAME = "GET ALL TOOL"
  mysqlPool.query("select * from Tool", function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get All Tool Data Found`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> All Tool Data Not Found`);
      return res.status(200).json({ "message": "ไม่พบข้อมูล" });
    }
  });
}

exports.getToolByRoomId = (req, res) => {
  const API_NAME = "GET TOOL BY ROOM ID"

  var roomId = req.params.roomid

  var sqlQueryToolByRoomId = "select * from Tool Where RoomId = ?"
  mysqlPool.query(sqlQueryToolByRoomId, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Tool By Room Id`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Tool By Room Id`);
      return res.status(200).json({ "message": "ไม่พบข้อมูล" });
    }
  })
}

// -- Report Tool Problem -- //
exports.getToolReportByUserId = (req, res) => {
  const API_NAME = "GET TOOL REPORT By UserId"

  var userId = req.params.userid

  var sqlQueryReport = "select r.ReportId, r.ReportToolName, r.ReportRoomName, r.ReportStatus, r.ReportDate from Report r join RoomAccess ra on (r.RoomAccessId = ra.RoomAccessId) join Booking b on (ra.BookingId = b.BookingId) join Room rm on (rm.RoomId = b.RoomId) join User u on (u.UserId = b.UserId) where u.UserId = ?"
  mysqlPool.query(sqlQueryReport, [userId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Found`);
      return res.status(200).json(results);
    } else {
      return res.status(404).send();
    }
  })
}

exports.getRoomNameForReportToolByUserId = (req, res) => {
  const API_NAME = "GET ROOM NAME FOR REPORT TOOL BY USER ID"

  var userId = req.params.userid

  var sqlQueryRoomName = "select distinct r.RoomId, r.RoomName, b.BookingTitle from Booking b " +
    "join RoomAccess ra on (ra.BookingId = b.BookingId) " +
    "join Room r on (r.RoomId = b.RoomId) " +
    "where r.RoomName not in (select ReportRoomName from Report join RoomAccess on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join Booking on (RoomAccess.BookingId = Booking.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?) " +
    "and b.BookingId not in (select Booking.BookingId from Report join RoomAccess on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join Booking on (RoomAccess.BookingId = Booking.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?)"

    mysqlPool.query(sqlQueryRoomName, [userId, userId], function(err, results) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }
  
      if (results.length > 0) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Found`);
        return res.status(200).json(results);
      } else {
        return res.status(404).send();
      }
    })
}