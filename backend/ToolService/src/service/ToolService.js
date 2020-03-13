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

exports.getToolNameForReportToolByRoomAccessId = (req, res) => {
  const API_NAME = "GET TOOL NAME FOR REPORT TOOL BY ROOM ACCESS ID"

  var roomAccessId = req.params.roomAccessId

  var sqlQueryToolName = "select t.ToolId, t.ToolName from RoomAccess ra " +
    "join Booking b on (b.BookingId = ra.BookingId) " +
    "join Room r on (r.RoomId = b.RoomId) " +
    "join Tool t on (t.RoomId = r.RoomId) where ra.RoomAccessId = ?"

  mysqlPool.query(sqlQueryToolName, [roomAccessId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
      return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      return res.status(200).json(results)
    } else {
      return res.status(200).json({ "isError": true, "message": "ไม่พบข้อมูลของอุปกรณ์" })
    }
  })
}

exports.getRoomNameForReportToolByUserId = (req, res) => {
  const API_NAME = "GET ROOM NAME FOR REPORT TOOL BY USER ID"

  var userId = req.params.userid

  var sqlQueryRoomName = "select distinct ra.RoomAccessId, r.RoomName, b.BookingTitle from Booking b " +
    "join RoomAccess ra on (ra.BookingId = b.BookingId) " +
    "join Room r on (r.RoomId = b.RoomId) " +
    "where r.RoomName not in (select RoomName from Booking  " +
    "join RoomAccess on (Booking.BookingId = RoomAccess.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join Report on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?) " +
    "and b.BookingId not in (select Booking.BookingId from Report join RoomAccess on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join Booking on (RoomAccess.BookingId = Booking.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?)"

  mysqlPool.query(sqlQueryRoomName, [userId, userId], function (err, results) {
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

exports.sendReportTool = (req, res) => {
  const API_NAME = "SEND REPORT TOOL"

  var reportStatus = "A"
  var roomAccessId = req.body.RoomAccessId
  let toolProblem = JSON.parse(req.body.ToolProblem)

  mysqlPool.getConnection(function (err, connection) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL POOL GET CONNECTION ERROR -> ${err.message}`);
      return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    connection.beginTransaction(function (err) {
      if (err) {
        connection.rollback(function () {
          console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err.message}`);
          return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        })
      }

      if (toolProblem.length > 0) {
        var sqlInsertReport = "insert into Report (ReportDetail, ReportStatus, ReportDate, ToolId, RoomAccessId) values (?, ?, ?, ?, ?)"
        for (var index in toolProblem) {
          connection.query(sqlInsertReport, [toolProblem[index].detail, reportStatus, new Date().toLocaleString(), toolProblem[index].toolId, roomAccessId], function (err, results) {
            if (err) {
              connection.rollback(function () {
                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err.message}`);
                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
              })
            }
          })
        }
      }

      connection.commit(function (err) {
        if (err) {
          connection.rollback(function () {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          })
        }

        res.status(200).json({ "isError": false, "message": "แจ้งปัญหาเรียบร้อย" })
      })
    })
  })
}
// -- Report Tool Problem -- //