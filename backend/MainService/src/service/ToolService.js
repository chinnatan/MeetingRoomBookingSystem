const MySQL = require("mysql");
const mysqlConfig = require("../config");

const SERVICE_NAME = "TOOL SERVICE";
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
  } else {
    console.log(`[${SERVICE_NAME}][${MYSQL_NAME}] Connected -> ${HOST_MYSQL}:${PORT_MYSQL}`);
  }
});

// แสดงข้อมูลอุปกรณ์ทั้งหมดที่มีในฐานข้อมูล
exports.getAllTool = (req, res) => {
  const FUNCTION_NAME = "GET ALL TOOL"
  mysqlCon.query("select * from Tool", function (err, results, fields) {
    if (err) {
      return res.status(500).json(err);
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Get All Tool Data Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> All Tool Data Not Found`);
        return res.status(404).json({"message": "ไม่พบข้อมูล"});
      }
    }
  });
}