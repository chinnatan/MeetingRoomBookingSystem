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

  var sqlQueryReport = "select r.ReportId, b.BookingTitle, t.ToolName, rm.RoomName, r.ReportDate, r.ReportStatus from Report r " +
    "join RoomAccess ra on (r.RoomAccessId = ra.RoomAccessId) " +
    "join Booking b on (ra.BookingId = b.BookingId) " +
    "join Room rm on (rm.RoomId = b.RoomId) " +
    "join User u on (u.UserId = b.UserId) " +
    "join Tool t on (t.ToolId = r.ToolId) " +
    "where u.UserId = ?"
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

exports.getToolReportByReportId = (req, res) => {
  const API_NAME = "GET TOOL REPORT BY REPORT ID"

  var reportId = req.params.reportId

  var sqlQueryReportById = "select r.ReportId, b.BookingTitle, rm.RoomName, t.ToolName, r.ReportDetail, r.ReportDate, r.ReportStatus from Report r " +
    "join Tool t on (t.ToolId = r.ToolId) " +
    "join RoomAccess ra on (ra.RoomAccessId = r.RoomAccessId) " +
    "join Booking b on (b.BookingId = ra.BookingId) " +
    "join Room rm on (rm.RoomId = b.RoomId) where r.ReportId = ?"
  mysqlPool.query(sqlQueryReportById, [reportId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
      return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      return res.status(200).json(results)
    } else {
      return res.status(200).json({ "isError": true, "message": "ไม่พบข้อมูลรายละเอียด" })
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
    "where b.BookingId not in (select Booking.BookingId from Report join RoomAccess on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join Booking on (RoomAccess.BookingId = Booking.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?) and UserId = ?"

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
          connection.query(sqlInsertReport, [toolProblem[index].detail, reportStatus, new Date(), toolProblem[index].toolId, roomAccessId], function (err, results) {
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

exports.callStaff = (req, res) => {
  const API_NAME = "CALL STAFF"

  let userEmail = req.body.UserEmail
  let userId = req.body.UserId

  var sqlQueryCheck = "select distinct * from Booking b " +
    "join RoomAccess ra on (ra.BookingId = b.BookingId) " +
    "join Room r on (r.RoomId = b.RoomId) " +
    "where b.BookingId not in (select Booking.BookingId from Report join RoomAccess on (Report.RoomAccessId = RoomAccess.RoomAccessId) " +
    "join Booking on (RoomAccess.BookingId = Booking.BookingId) " +
    "join Room on (Room.RoomId = Booking.RoomId) " +
    "join User on (User.UserId = Booking.UserId) where User.UserId = ?) and UserId = ? " +
    "order by b.BookingId DESC LIMIT 1"

  mysqlPool.query(sqlQueryCheck, [userId, userId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
      return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      const moment = require('moment')

      let bookingStartDate = new Date(results[0].BookingStartDate)
      let bookingEndDate = new Date(results[0].BookingEndDate)
      let startDate = new Date(results[0].StartDate)
      let currentDate = new Date()

      let roomName = results[0].RoomName
      let isBetweenCurrentDate = moment(currentDate).isBetween(bookingStartDate, bookingEndDate, null, '[]')
      let isBetweenStartDate = moment(startDate).isBetween(bookingStartDate, bookingEndDate, null, '[]')

      if (isBetweenCurrentDate && isBetweenStartDate) {
        const nodemailer = require('nodemailer');

        // config สำหรับของ gmail
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false, // use SSL
          port: 25, // port for secure SMTP
          auth: {
            user: Config.GMAIL.USER, // your email
            pass: Config.GMAIL.PWD // your email password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let addMailOptions = {
          from: userEmail,                // sender
          to: 'korn.chinnatan@gmail.com',                // list of receivers
          subject: `[MRBS] ห้อง ${roomName} ต้องการความช่วยเหลือ`,              // Mail subject
          html: `<b>ห้อง ${roomName} ต้องการความช่วยเหลือ<br>`   // HTML body
        };

        transporter.sendMail(addMailOptions, function (err, info) {
          if (err) {
            console.log(`[TRANSPORTER][ADD MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          } else {
            console.log(info);
            transporter.close(); // shut down the connection pool, no more messages
          }
        });

        return res.status(200).json({ "isError": false, "message": "แจ้งเจ้าหน้าที่สำเร็จ กรุณารอสักครู่" })
      } else {
        return res.status(200).json({ "isError": true, "message": "ไม่พบการใช้งาน ณ เวลา ปัจจุบัน" })
      }
    } else {
      return res.status(200).json({ "isError": true, "message": "ไม่พบการใช้งาน ณ เวลา ปัจจุบัน" })
    }
  })
}

// --สำหรับผู้ดูแลระบบ-- //
// -- Summary Report Tool Problem -- //
exports.summaryReportToolProblem = (req, res) => {
  const API_NAME = "SUMMARY REPORT TOOL PROBLEM"

  let isAdmin = req.body.isAdmin

  if (isAdmin) {
    var sqlQuerySummaryReport = "select t.ToolName, rm.RoomName, t.ToolStatus, r.ReportStatus, u.Fullname, r.ReportDate from Report r " +
      "join Tool t on (t.ToolId = r.ToolId) " +
      "join RoomAccess ra on (ra.RoomAccessId = r.RoomAccessId) " +
      "join Room rm on (rm.RoomId = t.RoomId) " +
      "join Booking b on (b.BookingId = ra.BookingId) " +
      "join User u on (u.UserId = b.UserId)"
    mysqlPool.query(sqlQuerySummaryReport, function (err, results) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      if (results.length > 0) {
        return res.status(200).json(results)
      } else {
        return res.status(200).json({ "message": "ไม่พบข้อมูลการใช้งาน" })
      }
    })
  } else {
    return res.status(403).send()
  }
}
// -- Summary Report Tool Problem -- //

// -- Get All Tool Report -- //
exports.getAllToolReport = (req, res) => {
  const API_NAME = "GET All TOOL REPORT"

  let isAdmin = req.body.isAdmin

  if (isAdmin) {
    var sqlQueryReport = "select r.ReportId, b.BookingTitle, t.ToolName, rm.RoomName, r.ReportDate, r.ReportStatus, u.Fullname from Report r " +
      "join RoomAccess ra on (r.RoomAccessId = ra.RoomAccessId) " +
      "join Booking b on (ra.BookingId = b.BookingId) " +
      "join Room rm on (rm.RoomId = b.RoomId) " +
      "join User u on (u.UserId = b.UserId) " +
      "join Tool t on (t.ToolId = r.ToolId) "
    mysqlPool.query(sqlQueryReport, function (err, results) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      if (results.length > 0) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Found`);
        return res.status(200).json({ "isError": false, "results": results });
      } else {
        return res.status(404).send();
      }
    })
  } else {
    return res.status(403).send()
  }
}
// -- Get All Tool Report -- //

// -- Update Report Status -- //
exports.updateReportStatus = (req, res) => {
  const API_NAME = "UPDATE REPORT STATUS"

  let isAdmin = req.body.isAdmin
  let reportId = req.body.ReportId
  let reportStatus = req.body.ReportStatus

  if (isAdmin) {
    var sqlUpdateReportStatus = "update Report set ReportStatus = ? where ReportId = ?"
    mysqlPool.query(sqlUpdateReportStatus, [reportStatus, reportId], function (err) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      return res.status(200).json({ "isError": false, "message": "เปลี่ยนแปลงสถานะรายงานสำเร็จ" });
    })
  } else {
    return res.status(403).send()
  }
}
// -- Update Report Status -- //

exports.frequentlyReportToolInProblemRanking = (req, res) => {
  const API_NAME = "FREQUENTLY REPORT TOOL IN PROBLEM RANKING"

  let isAdmin = req.body.isAdmin
  let isRanking = req.body.isRanking
  let isMonth = req.body.isMonth

  if (isAdmin) {
    var sqlQueryRanking = "select Room.RoomId, Room.RoomName, Report.ReportDate, count(*) as NUMBER from Report " +
      "right join Tool on (Tool.ToolId = Report.ToolId) " +
      "join Room on (Room.RoomId = Tool.RoomId) " +
      "where Report.ReportDate >= DATE_ADD(NOW(), interval -? month) " +
      "group by Room.RoomId, Report.ReportDate " +
      "order by NUMBER desc"
    mysqlPool.query(sqlQueryRanking, [isMonth], function (err, results) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      if (results.length > 0) {
        return res.status(200).json({ "isError": false, "data": results })
      } else {
        return res.status(200).json({ "isError": true, "data": "ไม่พบการจัดอันดับ" })
      }
    })
  } else {
    return res.status(403).send()
  }
}
// --สำหรับผู้ดูแลระบบ-- //