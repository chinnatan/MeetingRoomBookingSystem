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
  const API_NAME = "GET ALL ROOM"
  mysqlPool.query("select * from Room", function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get All Room Data Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> All Room Data Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลห้องด้วย ROOM ID
exports.getRoomById = (req, res) => {
  const API_NAME = "GET ROOM BY ID"

  var roomId = req.params.roomid;

  mysqlPool.query("select * from Room where RoomId = ?", [roomId], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลห้องด้วย ROOM NAME
exports.getRoomByName = (req, res) => {
  const API_NAME = "GET ROOM BY NAME"

  var roomName = req.params.roomname;

  mysqlPool.query("select * from Room where RoomName = ?", [roomName], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By Name Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By Name Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงข้อมูลของห้องทั้งหมดในชั้นที่ต้องการ
exports.getRoomByFloor = (req, res) => {
  const API_NAME = "GET ROOM BY FLOOR"

  var roomFloor = req.params.roomfloor;

  mysqlPool.query("select * from Room where RoomFloor = ?", [roomFloor], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    } else {
      if (results.length) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By Floor Found`);
        return res.status(200).json(results);
      } else {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By Floor Not Found`);
        return res.status(404).json({ "message": "ไม่พบข้อมูล" });
      }
    }
  });
};

// แสดงรายการการจองของห้องทั้งหมดโดยใช้ ROOM ID
exports.getRoomBookingStatusById = (req, res) => {
  const API_NAME = "GET ROOM BOOKING STATUS BY ID"

  var roomId = req.params.roomid;

  var sqlQueryRoom = "select * from Room where RoomId = ?"
  mysqlPool.query(sqlQueryRoom, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Found`);
      var sqlQueryRoomBooking = "select * from Room join Booking on (Room.RoomId = Booking.RoomId) where Room.RoomId = ? and Booking.BookingStatus = ?"
      mysqlPool.query(sqlQueryRoomBooking, [roomId, "B"], function (err, results, fields) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
          return res.status(500).json({ "sql_error_message": err.message });
        }

        if (results.length) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status By ID Found`);
          return res.status(200).json(results);
        } else {
          console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status By ID Not Found`);
          return res.status(404).json({ "message": "พร้อมใช้งาน" });
        }
      });
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Not Found`);
      return res.status(404).json({ "message": "ไม่พบห้องที่ต้องการ" });
    }
  })
};

// แสดงรายการการจองของห้องทั้งหมด ณ วันปัจจุบัน โดยใช้ ROOM ID
exports.getRoomBookingStatusCurDateById = (req, res) => {
  const API_NAME = "GET ROOM BOOKING STATUS CURRENT DATE BY ID"

  var roomId = req.params.roomid;

  var sqlQueryRoom = "select * from Room where RoomId = ?"
  mysqlPool.query(sqlQueryRoom, [roomId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Found`);
      var sqlQueryRoomBooking = "select Booking.BookingTitle, Booking.BookingStartDate, Booking.BookingEndDate, User.Fullname from mrbs.Booking join mrbs.User on (mrbs.Booking.UserId = mrbs.User.UserId) where RoomId = ? and BookingStatus = ? and BookingStartDate >= ?;"
      mysqlPool.query(sqlQueryRoomBooking, [roomId, "B", new Date().toLocaleString()], function (err, results, fields) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
          return res.status(500).json({ "sql_error_message": err.message });
        }

        if (results.length) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status By ID Found`);
          return res.status(200).json(results);
        } else {
          console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status By ID Not Found`);
          return res.status(404).json({ "message": "พร้อมใช้งาน" });
        }
      });
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room By ID Not Found`);
      return res.status(404).json({ "message": "ไม่พบห้องที่ต้องการ" });
    }
  })
};

// แสดงรายการการจองของห้องทั้งหมด ณ วัน และเวลาปัจจุบัน
exports.getRoomBookingStatusCurDateAndCurTime = (req, res) => {
  const API_NAME = "GET ROOM ALL BOOKING STATUS CURRENT DATE"

  var roomId = req.params.roomid;

  var sqlQueryRoomBooking = "select Booking.BookingId, Booking.BookingTitle, Booking.BookingStartDate, Booking.BookingEndDate, Booking.RoomId, User.Fullname from mrbs.Booking join mrbs.User on (mrbs.Booking.UserId = mrbs.User.UserId) where RoomId = ? and BookingStatus != ? and ? between BookingStartDate and BookingEndDate"
  mysqlPool.query(sqlQueryRoomBooking, [roomId, "C", new Date().toLocaleString()], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status Found`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status Not Found`);
      return res.status(200).json({ "message": "พร้อมใช้งาน" });
    }
  });
};

exports.displaySchedule = (req, res) => {
  const API_NAME = "DISPLAY SCHEDULE"

  var roomId = req.params.roomid;

  var sqlQueryRoomBooking = "select Booking.BookingId, Booking.BookingTitle, Booking.BookingStartDate, Booking.BookingEndDate, Booking.RoomId, User.Fullname from mrbs.Booking join mrbs.User on (mrbs.Booking.UserId = mrbs.User.UserId) where RoomId = ? and BookingStatus != ? and ? between BookingStartDate and BookingEndDate"
  mysqlPool.query(sqlQueryRoomBooking, [roomId, "C", new Date().toLocaleString()], function (err, results, fields) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] ERROR -> ${err.message}`);
      return res.status(500).json({ "sql_error_message": err.message });
    }

    if (results.length) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status Found`);
      return res.status(200).json(results);
    } else {
      console.log(`[${SERVICE_NAME}][${API_NAME}] -> Get Room Booking Status Not Found`);
      return res.status(200).json([{ "BookingId": null, "BookingTitle": null, "BookingStartDate": null, "BookingEndDate": null, "RoomId": null, "Fullname": null, "message": "พร้อมใช้งาน" }]);
    }
  });
};

exports.activeRoom = async (req, res) => {
  const API_NAME = "ACTIVE ROOM"

  var bookingId = req.body.bookingId;
  var bookingPin = req.body.bookingPin;
  var roomId = req.body.roomId;

  // --GET SETTING SYSTEM-- //
  const axios = require('axios')
  let settingRs
  let setting
  try {
    settingRs = await axios.get('http://localhost:4000/api/setting/')
    setting = {
      SlowestActivation: settingRs.data.SlowestActivation,
      Unit: {
        SlowestActivation: settingRs.data.Unit.SlowestActivation
      }
    }
  } catch (error) {
    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดความผิดพลาดของระบบ" })
  }
  // --GET SETTING SYSTEM-- //

  // --CONDITION BEFORE ACTIVE-- //
  const moment = require('moment')

  var sqlQueryRoomAccess = "select * from RoomAccess where BookingId = ?"
  mysqlPool.query(sqlQueryRoomAccess, [bookingId], async function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlQueryRoomAccess] ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      // --สั่งเปิดประตู-- //
      return res.status(200).json({ "message": "ยืนยันสำเร็จ" })
    } else {
      // --กรณีเข้าใช้งานห้องครั้งแรก-- //
      var sqlQueryBooking = "select * from Booking where BookingId = ?"
      mysqlPool.query(sqlQueryBooking, [bookingId], function (err, results) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlQueryBooking] ERROR -> ${err}`);
          return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
          var bookingStartDateTime = Date.parse(results[0].BookingStartDate)
          var currentDate = new Date()

          var start = moment(bookingStartDateTime)
          var current = moment(currentDate)
          var diffMinute = current.diff(start, 'minutes', true);
          if (diffMinute > setting.SlowestActivation) {
            var message = "ไม่สามารถยืนยันการเข้าใช้งานได้ เนื่องจากคุณมาเข้าใช้งานช้ากว่าที่ระบบกำหนด (ระบบกำหนดไว้ " + setting.SlowestActivation + " " + setting.Unit.SlowestActivation + ")"
            return res.status(200).json({ "diffMinute": diffMinute, "message": message })
          } else {
            if (start > current) {
              var message = "ไม่สามารถยืนยันการเข้าใช้งานได้ เนื่องจากยังไม่ถึงเวลาใช้งาน"
              return res.status(200).json({ "diffMinute": diffMinute, "message": message })
            } else {
              var sqlQueryBookingAndBookingPin = "select * from Booking where BookingId = ? and BookingPin = ?"
              mysqlPool.query(sqlQueryBookingAndBookingPin, [bookingId, bookingPin], function (err, results) {
                if (err) {
                  console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlQueryBookingAndBookingPin] ERROR -> ${err}`);
                  return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                }

                if (results.length > 0) {
                  mysqlPool.getConnection(function (err, connection) {
                    if (err) {
                      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL CONNECTION ERROR -> ${err}`);
                      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    connection.beginTransaction(function (err) {
                      if (err) {
                        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
                        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                      }

                      var sqlUpdateBookingStatus = "update Booking set BookingStatus = ? where BookingId = ?"
                      connection.query(sqlUpdateBookingStatus, ["U", bookingId], function (err) {
                        if (err) {
                          connection.rollback(function () {
                            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE[sqlUpdateBookingStatus] ERROR -> ${err}`);
                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                          })
                        }

                        var sqlInsertRoomAccess = "insert into RoomAccess (StartDate, EndDate, BookingId) values (?, ?, ?)"
                        connection.query(sqlInsertRoomAccess, [new Date(), null, bookingId], function (err) {
                          if (err) {
                            connection.rollback(function () {
                              console.log(`[${SERVICE_NAME}][${API_NAME}] SQL INSERT[sqlInsertRoomAccess] ERROR -> ${err}`);
                              return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                          }
                        })

                        connection.commit(function (err) {
                          if (err) {
                            connection.rollback(function () {
                              console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                              return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                          }

                          return res.status(200).json({ "message": "ยืนยันสำเร็จ" })
                        })
                      })
                    })
                  })
                } else {
                  var message = "ไม่สามารถยืนยันการเข้าใช้งานได้ เนื่องจากรหัสผ่านไม่ถูกต้องกรุณาลองใหม่อีกครั้ง"
                  return res.status(200).json({ "message": message })
                }
              })
            }
          }
        } else {
          var message = "ไม่สามารถยืนยันการเข้าใช้งานได้ เนื่องจากไม่พบการจองที่ต้องการ"
          return res.status(200).json({ "message": message })
        }
      })
    }
  })
}

exports.checkActiveRoom = (req, res) => {
  const API_NAME = "CHECK ACTIVE ROOM"

  var bookingId = req.body.bookingId;

  var sqlQueryRoomAccess = "select * from RoomAccess where BookingId = ?"
  mysqlPool.query(sqlQueryRoomAccess, [bookingId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlQueryRoomAccess] ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      return res.status(200).json({ "isOpen": true });
    } else {
      return res.status(200).json({ "isOpen": false });
    }
  })
}

exports.saveEndDateWhenDoorOpen = (req, res) => {
  const API_NAME = "SAVE END DATE WHEN DOOR OPEN"

  var bookingId = req.body.bookingId;

  var sqlQueryRoomAccess = "select * from RoomAccess where BookingId = ?"
  mysqlPool.query(sqlQueryRoomAccess, [bookingId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlQueryRoomAccess] ERROR -> ${err}`);
      return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length > 0) {
      var sqlUpdateEndDate = "update RoomAccess set EndDate = ? where BookingId = ?"
      mysqlPool.query(sqlUpdateEndDate, [new Date(), bookingId], function (err, results) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY[sqlUpdateEndDate] ERROR -> ${err}`);
          return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        return res.status(200).json({ "message": true });
      })
    } else {
      return res.status(200).json({ "message": false });
    }
  })
}

// --สำหรับผู้ดูแลระบบ-- //
exports.saveRoomSetting = (req, res) => {
  const API_NAME = "SAVE ROOM SETTING"

  var isAdmin = req.body.isAdmin
  var RoomId = req.body.RoomId
  var RoomPermissionStudent = req.body.RoomPermissionStudent
  var RoomPermissionProfessor = req.body.RoomPermissionProfessor
  var RoomPermissionStaff = req.body.RoomPermissionStaff
  var RoomActive = req.body.RoomActive
  var Tool = JSON.parse(req.body.Tool)

  if (isAdmin) {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL GET CONNECTION ERROR -> ${err}`);
        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      connection.beginTransaction(function (err) {
        if (err) {
          connection.rollback(function () {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err.message}`);
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          })
        }

        var sqlUpdateRoom = "update Room set RoomPermissionStudent = ?, RoomPermissionProfessor = ?, RoomPermissionStaff = ?, RoomActive = ? where RoomId = ?"
        connection.query(sqlUpdateRoom, [RoomPermissionStudent, RoomPermissionProfessor, RoomPermissionStaff, RoomActive, RoomId], function (err, results) {
          if (err) {
            connection.rollback(function () {
              console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE[sqlUpdateRoom] ERROR -> ${err.message}`);
              return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          for (var index in Tool) {
            var sqlUpdateTool = "update Tool set ToolStatus = ? where ToolId = ?"
            connection.query(sqlUpdateTool, [Tool[index].ToolStatus, Tool[index].ToolId], function (err, results) {
              if (err) {
                connection.rollback(function () {
                  console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE[sqlUpdateTool] ERROR -> ${err.message}`);
                  return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                })
              }
            })
          }

          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
              })
            }

            return res.status(200).json({ "isError": false, "message": "การตั้งค่าห้องสำเร็จ" })
          })
        })
      })
    })
  } else {
    return res.status(403).send()
  }
}

exports.frequentlyUseRanking = (req, res) => {
  const API_NAME = "FREQUENTLY USE RANKING"

  var isAdmin = req.body.isAdmin
  var isRanking = req.body.isRanking

  if (isAdmin) {
    var sqlQueryRanking = "select Room.RoomId, Room.RoomName, count(*) as NUMBER from Booking " +
      "right join Room on (Room.RoomId = Booking.RoomId) " +
      "where Room.RoomId not in (3) " +
      "group by Room.RoomId " +
      "order by NUMBER desc limit ?"

    mysqlPool.query(sqlQueryRanking, [isRanking], function (err, results) {
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