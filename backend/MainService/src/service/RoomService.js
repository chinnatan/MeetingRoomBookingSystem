const MySQL = require("mysql");
const mysqlConfig = require("../config");

const SERVICE_NAME = "ROOM SERVICE";
const MYSQL_NAME = "MYSQL"

// MySQL Option
const HOST_MYSQL = mysqlConfig.HOST;
const PORT_MYSQL = mysqlConfig.PORT;
const USER_MYSQL = mysqlConfig.USERNAME;
const PASS_MYSQL = mysqlConfig.PASSWORD;
const DATA_MYSQL = mysqlConfig.DATABASE;

// MySQL Connected
var mysqlCon = MySQL.createConnection({
  host: HOST_MYSQL,
  port: PORT_MYSQL,
  user: USER_MYSQL,
  password: PASS_MYSQL,
  database: DATA_MYSQL,
  insecureAuth: true
});

mysqlCon.connect(function (err) {
  if (err) {
    console.log(`[${SERVICE_NAME}][${MYSQL_NAME}] Error -> ${err.message}`);
    throw new Error(err);
  } else {
    console.log(`[${SERVICE_NAME}][${MYSQL_NAME}] Connected -> ${HOST_MYSQL}:${PORT_MYSQL}`);
  }
});

// แสดงข้อมูลห้องทั้งหมดที่มีในฐานข้อมูล
exports.getAllRoom = (req, res) => {
  const FUNCTION_NAME = "GET ALL ROOM"
  mysqlCon.query("select * from Room", function (err, results, fields) {
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

  mysqlCon.query("select * from Room where RoomId = ?", [roomId], function (err, results, fields) {
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

  mysqlCon.query("select * from Room where RoomName = ?", [roomName], function (err, results, fields) {
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

  mysqlCon.query("select * from Room where RoomFloor = ?", [roomFloor], function (err, results, fields) {
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
  mysqlCon.query(sqlQueryRoom, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get Room By ID Found`);
      var sqlQueryRoomBooking = "select * from Room join Booking on (Room.RoomId = Booking.RoomId) where Room.RoomId = ? and Booking.BookingStatus = ?"
      mysqlCon.query(sqlQueryRoomBooking, [roomId, "B"], function (err, results, fields) {
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