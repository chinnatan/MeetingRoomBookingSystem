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

    if(results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Tool By Room Id`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Tool By Room Id`);
      return res.status(200).json({"message": "ไม่พบข้อมูล"});
    }
  })
}