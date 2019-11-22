const MySQL = require("mysql");
const mysqlConfig = require("../config");

const NAME = "Room Service";

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
    console.log(`[${NAME}] Error -> ${err.message}`);
  } else {
    console.log(`[${NAME}] Connected to Mysql -> ${HOST_MYSQL}:${PORT_MYSQL}`);
  }
});


exports.getAllRoom = (req, res) => {
  mysqlCon.query("select * from room", function (err, results, fields) {
    if (err) {
      return res.json(err);
    } else {
      if (results.length) {
        console.log(`[${NAME}] -> Get All Room Data Success`);
        return res.status(200).json(results);
      }
    }
  });
};

exports.getRoomById = (req, res) => {
  var roomId = req.params.roomid;

  mysqlCon.query("select * from room where room_id = ?", [roomId], function (err, results, fields) {
    if (err) {
      return res.json(err);
    } else {
      if (results.length) {
        console.log(`[${NAME}] -> Get Room By ID Success`);
        return res.status(200).json(results);
      }
    }
  });
};

exports.getRoomByFloor = (req, res) => {
  var roomFloor = req.params.roomfloor;

  mysqlCon.query("select * from room where room_floor = ?", [roomFloor], function (err, results, fields) {
    if (err) {
      return res.json(err);
    } else {
      if (results.length) {
        console.log(`[${NAME}] -> Get Room By Floor Success`);
        return res.status(200).json(results);
      }
    }
  });
};