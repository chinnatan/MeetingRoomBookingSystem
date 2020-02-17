const MySQL = require("mysql");
const mysqlConfig = require("../config");
const setting = require("../setting.json")

const SERVICE_NAME = "BOOKING SERVICE";
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
    throw err;
  }

  console.log(`[${SERVICE_NAME}][${MYSQL_NAME}] Connected -> ${HOST_MYSQL}:${PORT_MYSQL}`);
});

function generatePin() {
  const FUNCTION_NAME = "GENERATE PIN"

  console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Generate PIN`);
  var sixDigitPin = Math.floor(100000 + Math.random() * 900000);

  return sixDigitPin
}

exports.addBooking = (req, res) => {
  const FUNCTION_NAME = "ADD BOOKING"

  var BookingTitle = req.body.BookingTitle
  var BookingDetail = req.body.BookingDetail
  var BookingPin = generatePin()
  var BookingDate = new Date()
  var BookingStartDate = req.body.BookingStartDate
  var BookingEndDate = req.body.BookingEndDate
  var BookingStartTime = req.body.BookingStartTime
  var BookingEndTime = req.body.BookingEndTime
  var BookingStatus = "B"
  var BookingPartner = req.body.BookingPartner
  var UserId = req.body.UserId
  var RoomId = req.body.RoomId

  let [startTimeHour, startTimeMinute] = BookingStartTime.split(':')
  let [endTimeHour, endTimeMinute] = BookingEndTime.split(':')

  var startDateTime = Date.parse(BookingStartDate)
  startDateTime = new Date(startDateTime)
  startDateTime.setHours(startTimeHour)
  startDateTime.setMinutes(startTimeMinute)
  startDateTime.setSeconds(0)
  var endDateTime = Date.parse(BookingEndDate)
  endDateTime = new Date(endDateTime)
  endDateTime.setHours(endTimeHour)
  endDateTime.setMinutes(endTimeMinute)
  endDateTime.setSeconds(0)
  var dateNow = new Date()

  try {
    var error_message = String.empty

    if ((startDateTime.getDate() < dateNow.getDate()) && (startDateTime.getMonth() <= dateNow.getMonth()) && (startDateTime.getFullYear() <= dateNow.getFullYear())) {
      error_message = "ไม่สามารถจองห้องย้อนหลังได้"
      throw error_message
    }

    if ((startDateTime.getDate() == dateNow.getDate()) && (startDateTime.getMonth() == dateNow.getMonth()) && (startDateTime.getFullYear() == dateNow.getFullYear()) && (startDateTime.getHours() <= dateNow.getHours()) && (startDateTime.getMinutes() <= dateNow.getMinutes())) {
      error_message = "ไม่สามารถจองห้องย้อนหลังได้"
      throw error_message
    }

    if((startDateTime.getDate() > endDateTime.getDate()) && (startDateTime.getMonth() >= endDateTime.getMonth()) && (startDateTime.getFullYear() >= endDateTime.getFullYear())) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่เริ่มต้นมากกว่าวันที่สิ้นสุด"
      throw error_message
    }

    var bookingDateTotal = parseInt((endDateTime - startDateTime) / (24 * 3600 * 1000) + 1)
    if (bookingDateTotal > setting.HighestDatePerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่ที่ต้องการจองเกินกำหนด (" + setting.HighestDatePerTime + " " + setting.Unit.HighestDatePerTime + ")"
      throw error_message
    }

    if (endDateTime.getHours() == 0) {
      var diffHours = (24 - startDateTime.getHours()) * 60
    } else {
      var diffHours = (endDateTime.getHours() - startDateTime.getHours()) * 60
    }
    var diffMinute = Math.abs(endDateTime.getMinutes() - startDateTime.getMinutes())
    var diffHoursMinute = diffHours - diffMinute
    if (diffHoursMinute <= 0) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาเริ่มต้นใช้งานมากกว่าหรือเท่ากับเวลาสิ้นสุดการใช้งาน"
      throw error_message
    } else if (diffHoursMinute > (setting.HighestPeriodPerTime * 60)) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"
      throw error_message
    }

    if (setting.Unit.AdvanceBooking.ShortName == 'D') {
      var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000)) + 1
      if (diffDay <= setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'H') {
      if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
        if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
          var diffHours = (24 - startDateTime.getHours()) * 60
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
      } else {
        var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
      }
      var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
      var diffHoursMinute = diffHours - diffMinute
      console.log(diffHoursMinute)

      if (startDateTime.getDate() == dateNow.getDate() && startDateTime.getMonth() == dateNow.getMonth() && startDateTime.getFullYear() == dateNow.getFullYear()) {
        if (diffHoursMinute < 0) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
          throw error_message
        } else if (diffHoursMinute < setting.AdvanceBooking * 60) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
          throw error_message
        }
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'M') {
      if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
        if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
          var diffHours = (24 - startDateTime.getHours()) * 60
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
      } else {
        var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
      }
      var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
      var diffHoursMinute = diffHours - diffMinute

      if (diffHoursMinute < 0) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffHoursMinute < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    }

    mysqlCon.beginTransaction(function (err) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
        return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }


      var sqlInsertBooking = "insert into Booking (BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingStatus, BookingPartner, UserId, RoomId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      mysqlCon.query(sqlInsertBooking, [BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingStatus, BookingPartner, UserId, RoomId], function (err, results) {
        if (err) {
          mysqlCon.rollback(function () {
            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL INSERT ERROR -> ${err}`);
            return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          })
        }

        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
        const nodemailer = require('nodemailer');
        const gmailConfig = require("../config");

        // config สำหรับของ gmail
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false, // use SSL
          port: 25, // port for secure SMTP
          auth: {
            user: gmailConfig.GMAIL.USER, // your email
            pass: gmailConfig.GMAIL.PWD // your email password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        var sqlQueryRoom = "select RoomName from Room where RoomId = ?"
        mysqlCon.query(sqlQueryRoom, [RoomId], function (err, results) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
              return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          if (results.length) {
            var roomName = results[0].RoomName
            if (startDateTime.getHours() == 0) {
              var bookingStartTime = "24:" + startDateTime.getMinutes()
            } else {
              var bookingStartTime = startDateTime.getHours() + ":" + startDateTime.getMinutes()
            }
            if (endDateTime.getHours() == 0) {
              var bookingEndTime = "24:" + endDateTime.getMinutes()
            } else {
              var bookingEndTime = endDateTime.getHours() + ":" + endDateTime.getMinutes()
            }
            let addMailOptions = {
              from: gmailConfig.GMAIL.USER,                // sender
              to: '59070040@it.kmitl.ac.th',                // list of receivers
              subject: `[MRBS] รหัสผ่านสำหรับการเข้าใช้งานห้อง ${roomName}`,              // Mail subject
              html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
              <b>หัวข้อการจอง : </b>${BookingTitle}<br>
              <b>วันที่จอง : </b>${startDateTime.toDateString()} - ${endDateTime.toDateString()}<br>
              <b>เวลาที่จอง : </b>${bookingStartTime} - ${bookingEndTime}<br>
              <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
            };

            transporter.sendMail(addMailOptions, function (err, info) {
              if (err) {
                mysqlCon.rollback(function () {
                  console.log(`[TRANSPORTER][ADD MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                  return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                })
              } else {
                console.log(info);
                transporter.close(); // shut down the connection pool, no more messages
              }
            });
          }
        })

        mysqlCon.commit(function (err) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL COMMIT ERROR -> ${err.message}`);
              return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Booking Successfully"`);

          res.status(200).json({ "pin": BookingPin, "message": "จองห้องสำเร็จ" })
        })
      })
    })
  } catch (err) {
    return res.status(200).json({ "error_message": err })
  }
};

exports.editBooking = (req, res) => {
  const FUNCTION_NAME = "EDIT BOOKING"

  var BookingId = req.body.BookingId
  var BookingTitle = req.body.BookingTitle
  var BookingDetail = req.body.BookingDetail
  var BookingDate = new Date()
  var BookingStartDate = req.body.BookingStartDate
  var BookingEndDate = req.body.BookingEndDate
  var BookingStartTime = req.body.BookingStartTime
  var BookingEndTime = req.body.BookingEndTime
  var BookingPartner = req.body.BookingPartner

  let [startTimeHour, startTimeMinute, startTimeSecond] = BookingStartTime.split(':')
  let [endTimeHour, endTimeMinute, endTimeSecond] = BookingEndTime.split(':')

  var startDateTime = Date.parse(BookingStartDate)
  startDateTime = new Date(startDateTime)
  startDateTime.setHours(startTimeHour)
  startDateTime.setMinutes(startTimeMinute)
  startDateTime.setSeconds(startTimeSecond)
  var endDateTime = Date.parse(BookingEndDate)
  endDateTime = new Date(endDateTime)
  endDateTime.setHours(endTimeHour)
  endDateTime.setMinutes(endTimeMinute)
  endDateTime.setSeconds(endTimeSecond)
  var dateNow = new Date()

  try {
    var error_message = String.empty

    if ((startDateTime.getDate() < dateNow.getDate()) && (startDateTime.getMonth() <= dateNow.getMonth()) && (startDateTime.getFullYear() <= dateNow.getFullYear())) {
      error_message = "ไม่สามารถแก้ไขการจองห้องย้อนหลังได้"
      throw error_message
    }

    if ((startDateTime.getHours() <= dateNow.getHours()) && (startDateTime.getMinutes() <= dateNow.getMinutes())) {
      error_message = "ไม่สามารถแก้ไขการจองห้องย้อนหลังได้"
      throw error_message
    }

    var bookingDateTotal = parseInt((endDateTime - startDateTime) / (24 * 3600 * 1000) + 1)
    if (bookingDateTotal > setting.HighestDatePerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่ที่ต้องการแก้ไขการจองเกินกำหนด (" + setting.HighestDatePerTime + " " + setting.Unit.HighestDatePerTime + ")"
      throw error_message
    }

    if (endDateTime.getHours() == 0) {
      var diffHours = (24 - startDateTime.getHours()) * 60
    } else {
      var diffHours = (endDateTime.getHours() - startDateTime.getHours()) * 60
    }
    var diffMinute = Math.abs(endDateTime.getMinutes() - startDateTime.getMinutes())
    var diffHoursMinute = diffHours - diffMinute
    if (diffHoursMinute <= 0) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาเริ่มต้นใช้งานมากกว่าหรือเท่ากับเวลาสิ้นสุดการใช้งาน"
      throw error_message
    } else if (diffHoursMinute > (setting.HighestPeriodPerTime * 60)) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการแก้ไขการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"
      throw error_message
    }

    if (setting.Unit.AdvanceBooking.ShortName == 'D') {
      var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000))
      if (diffDay > setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการแก้ไขการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'H') {
      if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
        if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
          var diffHours = (24 - startDateTime.getHours()) * 60
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
      } else {
        var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
      }
      var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
      var diffHoursMinute = diffHours - diffMinute

      if (diffHoursMinute < 0) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการแก้ไขการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffHoursMinute < setting.AdvanceBooking * 60) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการแก้ไขการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'M') {
      if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
        if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
          var diffHours = (24 - startDateTime.getHours()) * 60
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
      } else {
        var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
      }
      var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
      var diffHoursMinute = diffHours - diffMinute

      if (diffHoursMinute < 0) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการแก้ไขการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffHoursMinute < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการแก้ไขการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    }

    mysqlCon.beginTransaction(function (err) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
        return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
      }

      var sqlUpdateBooking = "update Booking set BookingTitle = ?, BookingDetail = ?, BookingDate = ?, BookingStartDate = ?, BookingEndDate = ?, BookingStartTime = ?, BookingEndTime = ?, BookingPartner = ? where BookingId = ?"
      mysqlCon.query(sqlUpdateBooking, [BookingTitle, BookingDetail, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingPartner, BookingId], function (err, results) {
        if (err) {
          mysqlCon.rollback(function () {
            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL UPDATE ERROR -> ${err}`);
            return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          })
        }

        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
        const nodemailer = require('nodemailer');
        const gmailConfig = require("../config");

        // config สำหรับของ gmail
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false, // use SSL
          port: 25, // port for secure SMTP
          auth: {
            user: gmailConfig.GMAIL.USER, // your email
            pass: gmailConfig.GMAIL.PWD // your email password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        var sqlQueryBooking = "select BookingPin, RoomId from Booking where BookingId = ?"
        mysqlCon.query(sqlQueryBooking, [BookingId], function (err, booking_results) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
              return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          if (booking_results.length) {
            var bookingPin = booking_results[0].BookingPin
            var roomId = booking_results[0].RoomId

            var sqlQueryRoom = "select RoomName from Room where RoomId = ?"
            mysqlCon.query(sqlQueryRoom, [roomId], function (err, results) {
              if (err) {
                mysqlCon.rollback(function () {
                  console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
                  return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                })
              }

              if (results.length) {
                var roomName = results[0].RoomName

                if (startDateTime.getHours() == 0) {
                  var bookingStartTime = "24:" + startDateTime.getMinutes()
                } else {
                  var bookingStartTime = startDateTime.getHours() + ":" + startDateTime.getMinutes()
                }
                if (endDateTime.getHours() == 0) {
                  var bookingEndTime = "24:" + endDateTime.getMinutes()
                } else {
                  var bookingEndTime = endDateTime.getHours() + ":" + endDateTime.getMinutes()
                }
                let editMailOptions = {
                  from: gmailConfig.GMAIL.USER,                // sender
                  to: '59070040@it.kmitl.ac.th',                // list of receivers
                  subject: `[MRBS][แก้ไข] แก้ไขข้อมูลการจองห้อง ${roomName} สำเร็จ`,              // Mail subject
                  html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
                  <b>หัวข้อการจอง : </b>${BookingTitle}<br>
                  <b>วันที่จอง : </b>${startDateTime.toDateString()} - ${endDateTime.toDateString()}<br>
                  <b>เวลาที่จอง : </b>${bookingStartTime} - ${bookingEndTime}<br>
                  <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${bookingPin}`   // HTML body
                };

                transporter.sendMail(editMailOptions, function (err, info) {
                  if (err) {
                    mysqlCon.rollback(function () {
                      console.log(`[TRANSPORTER][EDIT MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                      return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    })
                  } else {
                    console.log(info);
                    transporter.close(); // shut down the connection pool, no more messages
                  }
                });
              }
            })
          }
        })

        mysqlCon.commit(function (err) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL COMMIT ERROR -> ${err.message}`);
              return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Edit Booking Successfully"`);

          return res.status(200).json({ "message": "แก้ไขสำเร็จ" })
        })
      })
    })
  } catch (err) {
    return res.status(500).json({ "error_message": err })
  }
}

exports.cancelBooking = (req, res) => {
  const FUNCTION_NAME = "CANCEL BOOKING"

  var BookingId = req.body.BookingId

  var sqlQueryBooking = "select BookingStartDate, BookingStartTime from Booking where BookingId = ?"
  mysqlCon.query(sqlQueryBooking, [BookingId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
      return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    try {
      var error_message = String.empty

      var bookingStartDate = results[0].BookingStartDate
      var bookingStartTime = results[0].BookingStartTime

      let [startTimeHour, startTimeMinute, startTimeSecond] = bookingStartTime.split(':')

      var startDateTime = Date.parse(bookingStartDate)
      startDateTime = new Date(startDateTime)
      startDateTime.setHours(startTimeHour)
      startDateTime.setMinutes(startTimeMinute)
      startDateTime.setSeconds(startTimeSecond)
      var dateNow = new Date()

      if ((startDateTime.getDate() < dateNow.getDate()) && (startDateTime.getMonth() <= dateNow.getMonth()) && (startDateTime.getFullYear() <= dateNow.getFullYear())) {
        error_message = "ไม่สามารถยกเลิกการจองย้อนหลังได้"
        throw error_message
      }

      if ((startDateTime.getHours() <= dateNow.getHours()) && (startDateTime.getMinutes() <= dateNow.getMinutes())) {
        error_message = "ไม่สามารถยกเลิกการจองย้อนหลังได้"
        throw error_message
      }

      if (setting.Unit.AdvanceCancel.ShortName == 'D') {
        var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000))
        if (diffDay > setting.AdvanceCancel) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      } else if (setting.Unit.AdvanceCancel.ShortName == 'H') {
        if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
          if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
            var diffHours = (24 - startDateTime.getHours()) * 60
          } else {
            var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
          }
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
        var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
        var diffHoursMinute = diffHours - diffMinute

        if (diffHoursMinute < 0) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
          throw error_message
        } else if (diffHoursMinute < setting.AdvanceCancel * 60) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องยกเลิกการจองล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      } else if (setting.Unit.AdvanceCancel.ShortName == 'M') {
        if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
          if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
            var diffHours = (24 - startDateTime.getHours()) * 60
          } else {
            var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
          }
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
        var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
        var diffHoursMinute = diffHours - diffMinute

        if (diffHoursMinute < 0) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
          throw error_message
        } else if (diffHoursMinute < setting.AdvanceCancel) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องยกเลิกการจองล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      }

      mysqlCon.beginTransaction(function (err) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
          return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        var sqlUpdateBooking = "update Booking set BookingStatus = ? where BookingId = ?"
        mysqlCon.query(sqlUpdateBooking, ["C", BookingId], function (err, results) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL UPDATE ERROR -> ${err}`);
              return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            })
          }

          // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
          const nodemailer = require('nodemailer');
          const gmailConfig = require("../config");

          // config สำหรับของ gmail
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, // use SSL
            port: 25, // port for secure SMTP
            auth: {
              user: gmailConfig.GMAIL.USER, // your email
              pass: gmailConfig.GMAIL.PWD // your email password
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          var sqlQueryBooking = "select RoomId from Booking where BookingId = ?"
          mysqlCon.query(sqlQueryBooking, [BookingId], function (err, booking_results) {
            if (err) {
              mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
                return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
              })
            }

            if (booking_results.length) {
              var roomId = booking_results[0].RoomId

              var sqlQueryRoom = "select RoomName from Room where RoomId = ?"
              mysqlCon.query(sqlQueryRoom, [roomId], function (err, results) {
                if (err) {
                  mysqlCon.rollback(function () {
                    console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
                    return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                  })
                }

                if (results.length) {
                  var roomName = results[0].RoomName

                  let cancelMailOptions = {
                    from: gmailConfig.GMAIL.USER,                // sender
                    to: '59070040@it.kmitl.ac.th',                // list of receivers
                    subject: `[MRBS][ยกเลิก] ยกเลิกการจองห้อง ${roomName} สำเร็จ`,              // Mail subject
                    html: `<b>ห้องที่ทำการจอง : </b>${roomName} <b><font color='red'>ยกเลิกสำเร็จ</font></b>`   // HTML body
                  };

                  transporter.sendMail(cancelMailOptions, function (err, info) {
                    if (err) {
                      mysqlCon.rollback(function () {
                        console.log(`[TRANSPORTER][CANCEL MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                        return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                      })
                    } else {
                      console.log(info);
                      transporter.close(); // shut down the connection pool, no more messages
                    }
                  });
                }
              })
            }
          })

          mysqlCon.commit(function (err) {
            if (err) {
              mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
              })
            }

            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Cancel Booking Successfully"`);

            return res.status(200).json({ "message": "ยกเลิกสำเร็จ" })
          })
        })
      })
    } catch (err) {
      return res.status(500).json({ "error_message": err })
    }
  })
}

exports.startBookingUse = (req, res) => {
  const FUNCTION_NAME = "START BOOKING USE"

  var bookingId = req.body.BookingId
  var bookingPin = req.body.BookingPin

  var sqlQueryBooking = "select BookingPin, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, UserId, RoomId from Booking where BookingId = ?"
  mysqlCon.query(sqlQueryBooking, [bookingId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL QUERY ERROR -> ${err.message}`);
      return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
    }

    if (results.length) {
      try {
        var error_message = String.empty
        var bookingStartDate = results[0].BookingStartDate
        var bookingEndDate = results[0].BookingEndDate
        var bookingStartTime = results[0].BookingStartTime
        var bookingEndTime = results[0].BookingEndTime
        var userId = results[0].UserId
        var roomId = results[0].RoomId

        let [startTimeHour, startTimeMinute, startTimeSecond] = bookingStartTime.split(':')
        let [endTimeHour, endTimeMinute, endTimeSecond] = bookingEndTime.split(':')

        var startDateTime = Date.parse(bookingStartDate)
        startDateTime = new Date(startDateTime)
        startDateTime.setHours(startTimeHour)
        startDateTime.setMinutes(startTimeMinute)
        startDateTime.setSeconds(startTimeSecond)
        var endDateTime = Date.parse(bookingEndDate)
        endDateTime = new Date(endDateTime)
        endDateTime.setHours(endTimeHour)
        endDateTime.setMinutes(endTimeMinute)
        endDateTime.setSeconds(endTimeSecond)
        var dateNow = new Date()
        
        // TESTING
        // var dateNow = new Date("2020-02-20")
        // console.log(dateNow.toLocaleString())
        // dateNow.setHours(22)
        // dateNow.setMinutes(00)
        // dateNow.setSeconds(00)
        // console.log(dateNow.toLocaleString())

        if(!((dateNow >= startDateTime) && (dateNow <= endDateTime))) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากไม่อยู่ในช่วงเวลาที่ทำการจอง"
          throw error_message
        } else if ((startDateTime.getHours() != dateNow.getHours()) && (startDateTime.getMinutes() != dateNow.getMinutes())) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากยังไม่ถึงเวลาเข้าใช้งาน"
          throw error_message
        } else if ((startDateTime.getHours() < dateNow.getHours()) && (startDateTime.getMinutes() <= dateNow.getMinutes())) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากยังไม่ถึงเวลาเข้าใช้งาน"
          throw error_message
        } else if ((startDateTime.getHours() > dateNow.getHours()) && (startDateTime.getMinutes() >= dateNow.getMinutes())) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากยังไม่ถึงเวลาเข้าใช้งาน"
          throw error_message
        }

        if (dateNow.getHours() == 0 || (startDateTime.getHours() == 0)) {
          if (startDateTime.getHours() >= 10 && startDateTime.getHours() <= 23) {
            var diffHours = (24 - startDateTime.getHours()) * 60
          } else {
            var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
          }
        } else {
          var diffHours = (startDateTime.getHours() - dateNow.getHours()) * 60
        }
        var diffMinute = Math.abs(dateNow.getMinutes() - startDateTime.getMinutes())
        var diffHoursMinute = Math.abs(diffHours - diffMinute)

        if (diffHoursMinute > setting.SlowestActivation) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเข้าใช้งานช้ากว่าที่ระบบกำหนด (เข้าช้าได้ " + setting.SlowestActivation + " " + setting.Unit.SlowestActivation + ")"
          throw error_message
        }

        if (bookingPin != results[0].BookingPin) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากรหัสผ่านสำหรับเข้าใช้งานไม่ถูกต้อง"
          throw error_message
        }

        mysqlCon.beginTransaction(function (err) {
          if (err) {
            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
            return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
          }

          var sqlInsertRoomAccess = "insert into RoomAccess (StartDate, EndDate, UserId, RoomId) values (?, ?, ?, ?)"
          mysqlCon.query(sqlInsertRoomAccess, [dateNow, null, userId, roomId], function (err) {
            if (err) {
              mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
              })
            }

            mysqlCon.commit(function (err) {
              if (err) {
                mysqlCon.rollback(function () {
                  console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                  return res.status(500).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                })
              }

              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Room Access Successfully"`);

              return res.status(200).json({ "message": "ยืนยันการเข้าใช้งานสำเร็จ ประตูจะถูกปลดล็อคเป็นเวลา 5 วินาที" })
            })
          })
        })

      } catch (err) {
        return res.status(500).json({ "error_message": err })
      }
    }
  })
}