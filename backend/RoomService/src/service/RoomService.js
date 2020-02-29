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

// แสดงข้อมูลห้องทั้งหมดที่มีในฐานข้อมูล
exports.getAllRoom = (req, res) => {
  const FUNCTION_NAME = "GET ALL ROOM"
  mysqlPool.query("select * from Room", function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get All Room Data Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> All Room Data Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลห้องด้วย ROOM ID
exports.getRoomById = (req, res) => {
  const FUNCTION_NAME = "GET ROOM BY ID"

  var roomId = req.params.roomid;

  mysqlPool.query("select * from Room where RoomId = ?", [roomId], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลห้องด้วย ROOM NAME
exports.getRoomByName = (req, res) => {
  const FUNCTION_NAME = "GET ROOM BY NAME"

  var roomName = req.params.roomname;

  mysqlPool.query("select * from Room where RoomName = ?", [roomName], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By Name Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By Name Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลของห้องทั้งหมดในชั้นที่ต้องการ
exports.getRoomByFloor = (req, res) => {
  const FUNCTION_NAME = "GET ROOM BY FLOOR"

  var roomFloor = req.params.roomfloor;

  mysqlPool.query("select * from Room where RoomFloor = ?", [roomFloor], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By Floor Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By Floor Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงรายการการจองของห้องทั้งหมดโดยใช้ ROOM ID
exports.getRoomBookingStatusById = (req, res) => {
  const FUNCTION_NAME = "GET ROOM BOOKING STATUS BY ID"

  var roomId = req.params.roomid;

  var sqlQueryRoom = "select * from Room where RoomId = ?"
  mysqlPool.query(sqlQueryRoom, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Found`);
      var sqlQueryRoomBooking = "select * from Room join Booking on (Room.RoomId = Booking.RoomId) where Room.RoomId = ? and Booking.BookingStatus = ?"
      mysqlPool.query(sqlQueryRoomBooking, [roomId, "B"], function (err, results, fields) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
          return res.status(500).json({ "sql_error_message": err.message });
        }

        if (results.length) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status By ID Found`);
          return res.status(200).json(results);
        } else {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status By ID Not Found`);
          return res.status(404).json({ "message": "พร้อมใช้งาน" });
        }
      });
    } else {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Not Found`);
      return res.status(404).json({ "message": "ไม่พบห้องที่ต้องการ" });
    }
  })
};

// แสดงรายการการจองของห้องทั้งหมด ณ วันปัจจุบัน โดยใช้ ROOM ID
exports.getRoomBookingStatusCurDateById = (req, res) => {
  const FUNCTION_NAME = "GET ROOM BOOKING STATUS CURRENT DATE BY ID"

  var roomId = req.params.roomid;

  var sqlQueryRoom = "select * from Room where RoomId = ?"
  mysqlPool.query(sqlQueryRoom, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Found`);
      var sqlQueryRoomBooking = "select Booking.BookingTitle, Booking.BookingStartDate, Booking.BookingEndDate, User.Fullname from mrbs.Booking join mrbs.User on (mrbs.Booking.UserId = mrbs.User.UserId) where RoomId = ? and BookingStatus = ? and BookingStartDate >= ?;"
      mysqlPool.query(sqlQueryRoomBooking, [roomId, "B", new Date().toLocaleString()], function (err, results, fields) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
          return res.status(500).json({ "sql_error_message": err.message });
        }

        if (results.length) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status By ID Found`);
          return res.status(200).json(results);
        } else {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status By ID Not Found`);
          return res.status(404).json({ "message": "พร้อมใช้งาน" });
        }
      });
    } else {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Not Found`);
      return res.status(404).json({ "message": "ไม่พบห้องที่ต้องการ" });
    }
  })
};

// แสดงรายการการจองของห้องทั้งหมด ณ วัน และเวลาปัจจุบัน
exports.getRoomBookingStatusCurDateAndCurTime = (req, res) => {
  const FUNCTION_NAME = "GET ROOM ALL BOOKING STATUS CURRENT DATE"

  var roomId = req.params.roomid;

  var sqlQueryRoomBooking = "select Booking.BookingTitle, Booking.BookingStartDate, Booking.BookingEndDate, Booking.RoomId, User.Fullname from mrbs.Booking join mrbs.User on (mrbs.Booking.UserId = mrbs.User.UserId) where RoomId = ? and BookingStatus = ? and ? between BookingStartDate and BookingEndDate"
  mysqlPool.query(sqlQueryRoomBooking, [roomId, "B", new Date().toLocaleString()], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status Found`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room Booking Status Not Found`);
      return res.status(200).json({ "message": "พร้อมใช้งาน" });
    }
  });
};