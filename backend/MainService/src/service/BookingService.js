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
    throw new Error(err);
  } else {
    console.log(`[${SERVICE_NAME}][${MYSQL_NAME}] Connected -> ${HOST_MYSQL}:${PORT_MYSQL}`);
  }
});

function padZeroLeft(str, max) {
  str = str.toString().substring(str.length - 2, str.length);
  return str.length < max ? padZeroLeft("0" + str, max) : str;
}

function generatePin(UserId) {
  const FUNCTION_NAME = "GENERATE PIN"

  console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Generate PIN`);
  var fourDigitPin = Math.floor(1000 + Math.random() * 9000);
  var sixDigitPin = padZeroLeft(UserId, 2) + fourDigitPin.toString()

  return sixDigitPin
}

exports.addBooking = (req, res) => {
  const FUNCTION_NAME = "ADD BOOKING"

  var BookingTitle = req.body.BookingTitle
  var BookingDetail = req.body.BookingDetail
  var BookingPin = generatePin(req.body.UserId)
  var BookingDate = new Date()
  var BookingStartDate = req.body.BookingStartDate
  var BookingEndDate = req.body.BookingEndDate
  var BookingStartTime = req.body.BookingStartTime
  var BookingEndTime = req.body.BookingEndTime
  var BookingStatus = req.body.BookingStatus
  var UserId = req.body.UserId
  var RoomId = req.body.RoomId

  let [startTimeHour, startTimeMinute, startTimeSecond] = BookingStartTime.split(':')
  let [endTimeHour, endTimeMinute, endTimeSecond] = BookingEndTime.split(':')

  var startTime = new Date()
  startTime.setHours(startTimeHour)
  startTime.setMinutes(startTimeMinute)
  startTime.setSeconds(startTimeSecond)
  var endTime = new Date()
  endTime.setHours(endTimeHour)
  endTime.setMinutes(endTimeMinute)
  endTime.setSeconds(endTimeSecond)

  var startDateTime = Date.parse(BookingStartDate)
  startDateTime = new Date(startDateTime)
  var endDateTime = Date.parse(BookingEndDate)
  endDateTime = new Date(endDateTime)
  var dateNow = new Date()

  try {
    var error_message

    // กระบวนการตรวจสอบเงื่อนไขการจอง
    // 1.ตรวจสอบเวลาในการทำการจองล่วงหน้าในการตั้งค่าของระบบว่ามีหน่วยอะไร (นาที = M / ชั่วโมง = H / วัน = D)
    // 2.เมื่อทราบแล้วว่าในการตั้งค่าของระบบเป็นหน่วยอะไร จะทำการคำนวณตามหน่วยนั้นๆ
    // 3.นำสิ่งที่คำนวณได้มาตรวจสอบตามการตั้งค่าของระบบ ถ้าไม่ผ่านให้โยน Error Message กลับไปหาผู้ใช้

    if (setting.Unit.AdvanceBooking.ShortName == 'D') { // 1
      var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000)) // 2

      if (diffDay < setting.AdvanceBooking) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'H') { // 1
      var diffHours = startTime.getHours() - dateNow.getHours() // 2

      if (diffHours < 0) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffHours < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'M') { // 1
      var diffMinutes = startTime.getMinutes() - dateNow.getMinutes() // 2

      if (diffMinutes < 0) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffMinutes < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    }

    // คิดระยะเวลา
    var diffH = endTime.getHours() - startTime.getHours()
    var diffMin = Math.abs(endTime.getMinutes() - startTime.getMinutes())

    // คิดจำนวนวัน
    var diffDate = parseInt((endDateTime - startDateTime) / (24 * 3600 * 1000) + 1)

    // รวมชั่วโมงและนาทีเป็น string
    var diffTime = diffH.toString() + "." + diffMin.toString()

    // แปลงระยะเวลาเป็น float
    var diffTime = parseFloat(diffTime)

    // ตรวจสอบระยะเวลาและวันที่กับการตั้งค่าที่ระบบกำหนด
    if (diffTime > setting.HighestPeriodPerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"

      throw error_message
    } else if (diffDate > setting.HighestDatePerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่ที่ต้องการจองเกินกำหนด (" + setting.HighestDatePerTime + " " + setting.Unit.HighestDatePerTime + ")"

      throw error_message
    }

    // เมื่อผ่านเงือนไขทั้งหมดจะทำการเพิ่มข้อมูลการจองทั้งหมดลงฐานข้อมูล
    mysqlCon.beginTransaction(function (err) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
        throw err
      } else {
        var sqlInsertBooking = "insert into Booking (BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingStatus, UserId, RoomId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        mysqlCon.query(sqlInsertBooking, [BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingStatus, UserId, RoomId], function (err, results, fields) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
              error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
              throw error_message
            })
          }
          mysqlCon.commit(function (err) {
            if (err) {
              return mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
                error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
                throw error_message
              })
            }

            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Booking Successfully"`);

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

            let mailOptions = {
              from: gmailConfig.GMAIL.USER,                // sender
              to: '59070040@it.kmitl.ac.th',                // list of receivers
              subject: '[MRBS] รหัสผ่านสำหรับการเข้าใช้งานห้อง',              // Mail subject
              html: `<b>หมายเลขประจำห้องที่ทำการจอง : </b>${RoomId}<br>
              <b>หัวข้อการจอง : </b>${BookingTitle}<br>
              <b>วันที่จอง : </b>${startDateTime.toDateString()} - ${endDateTime.toDateString()}<br>
              <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
            };

            transporter.sendMail(mailOptions, function (err, info) {
              if (err)
                console.log(err)
              else {
                console.log(info);
                transporter.close(); // shut down the connection pool, no more messages
              }
            });

            res.status(200).json({ "Pin": BookingPin, "message": "จองห้องสำเร็จ" })
          })
        })
      }
    })
  } catch (err) {
    return res.status(200).json({ "message": err })
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

  let [startTimeHour, startTimeMinute, startTimeSecond] = BookingStartTime.split(':')
  let [endTimeHour, endTimeMinute, endTimeSecond] = BookingEndTime.split(':')

  var startTime = new Date()
  startTime.setHours(startTimeHour)
  startTime.setMinutes(startTimeMinute)
  startTime.setSeconds(startTimeSecond)
  var endTime = new Date()
  endTime.setHours(endTimeHour)
  endTime.setMinutes(endTimeMinute)
  endTime.setSeconds(endTimeSecond)

  var startDateTime = Date.parse(BookingStartDate)
  startDateTime = new Date(startDateTime)
  var endDateTime = Date.parse(BookingEndDate)
  endDateTime = new Date(endDateTime)
  var dateNow = new Date()

  try {
    var error_message

    // กระบวนการตรวจสอบเงื่อนไขการจอง
    // 1.ตรวจสอบเวลาในการทำการจองล่วงหน้าในการตั้งค่าของระบบว่ามีหน่วยอะไร (นาที = M / ชั่วโมง = H / วัน = D)
    // 2.เมื่อทราบแล้วว่าในการตั้งค่าของระบบเป็นหน่วยอะไร จะทำการคำนวณตามหน่วยนั้นๆ
    // 3.นำสิ่งที่คำนวณได้มาตรวจสอบตามการตั้งค่าของระบบ ถ้าไม่ผ่านให้โยน Error Message กลับไปหาผู้ใช้

    if (setting.Unit.AdvanceBooking.ShortName == 'D') { // 1
      var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000)) // 2

      if (diffDay < setting.AdvanceBooking) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'H') { // 1
      var diffHours = startTime.getHours() - dateNow.getHours() // 2

      if (diffHours < 0) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffHours < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'M') { // 1
      var diffMinutes = startTime.getMinutes() - dateNow.getMinutes() // 2

      if (diffMinutes < 0) { // 3
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw error_message
      } else if (diffMinutes < setting.AdvanceBooking) {
        error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw error_message
      }
    }

    // คิดระยะเวลา
    var diffH = endTime.getHours() - startTime.getHours()
    var diffMin = Math.abs(endTime.getMinutes() - startTime.getMinutes())

    // คิดจำนวนวัน
    var diffDate = parseInt((endDateTime - startDateTime) / (24 * 3600 * 1000) + 1)

    // รวมชั่วโมงและนาทีเป็น string
    var diffTime = diffH.toString() + "." + diffMin.toString()

    // แปลงระยะเวลาเป็น float
    var diffTime = parseFloat(diffTime)

    // ตรวจสอบระยะเวลาและวันที่กับการตั้งค่าที่ระบบกำหนด
    if (diffTime > setting.HighestPeriodPerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"

      throw error_message
    } else if (diffDate > setting.HighestDatePerTime) {
      error_message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่ที่ต้องการจองเกินกำหนด (" + setting.HighestDatePerTime + " " + setting.Unit.HighestDatePerTime + ")"

      throw error_message
    }

    // เมื่อผ่านเงือนไขทั้งหมดจะทำการเพิ่มข้อมูลการจองทั้งหมดลงฐานข้อมูล
    mysqlCon.beginTransaction(function (err) {
      if (err) {
        console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
        throw err
      } else {
        var sqlUpdateBooking = "update Booking set BookingTitle = ?, BookingDetail = ?, BookingDate = ?, BookingStartDate = ?, BookingEndDate = ?, BookingStartTime = ?, BookingEndTime = ? where BookingId = ?"
        mysqlCon.query(sqlUpdateBooking, [BookingTitle, BookingDetail, BookingDate, BookingStartDate, BookingEndDate, BookingStartTime, BookingEndTime, BookingId], function (err, results, fields) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
              error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
              throw error_message
            })
          }
          mysqlCon.commit(function (err) {
            if (err) {
              return mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
                error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
                throw error_message
              })
            }

            console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> "Edit Booking Successfully"`);

            var sqlQueryBooking = "select BookingPin, RoomId from Booking where BookingId = ?"
            mysqlCon.query(sqlQueryBooking, [BookingId], function (err, results) {
              if (err) {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
                throw err
              }

              var BookingPin = results[0].BookingPin
              var RoomId = results[0].RoomId

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

              let mailOptions = {
                from: gmailConfig.GMAIL.USER,                // sender
                to: '59070040@it.kmitl.ac.th',                // list of receivers
                subject: '[MRBS][แก้ไขการจอง] รหัสผ่านสำหรับการเข้าใช้งานห้อง',              // Mail subject
                html: `<b>หมายเลขประจำห้องที่ทำการจอง : </b>${RoomId}<br>
              <b>หัวข้อการจอง : </b>${BookingTitle}<br>
              <b>วันที่จอง : </b>${startDateTime.toDateString()} - ${endDateTime.toDateString()}<br>
              <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
              };

              transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                  console.log(err)
                else {
                  console.log(info);
                  transporter.close(); // shut down the connection pool, no more messages
                }
              });

              res.status(200).json({ "Pin": BookingPin, "message": "แก้ไขการจองสำเร็จ" })
            })
          })
        })
      }
    })
  } catch (err) {
    return res.status(200).json({ "message": err })
  }
}

exports.cancelBooking = (req, res) => {
  const FUNCTION_NAME = "CANCEL BOOKING"

  var BookingId = req.body.BookingId

  var sqlQueryBooking = "select BookingStartDate, BookingStartTime from Booking where BookingId = ?"
  mysqlCon.query(sqlQueryBooking, [BookingId], function (err, results) {
    if (err) {
      console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
      throw err
    }

    try {
      var BookingStartDate = results[0].BookingStartDate
      var BookingStartTime = results[0].BookingStartTime

      let [startTimeHour, startTimeMinute, startTimeSecond] = BookingStartTime.split(':')

      var startDateTime = Date.parse(BookingStartDate)
      startDateTime = new Date(startDateTime)
      startDateTime.setHours(startTimeHour)
      startDateTime.setMinutes(startTimeMinute)
      startDateTime.setSeconds(startTimeSecond)

      var dateNow = new Date()
      dateNow.setHours(17)

      if (setting.Unit.AdvanceCancel.ShortName == 'D') { // 1
        var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000)) // 2

        if (diffDay < setting.AdvanceCancel) { // 3
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      } else if (setting.Unit.AdvanceCancel.ShortName == 'H') { // 1
        var diffHours = startDateTime.getHours() - dateNow.getHours() // 2

        if (diffHours < 0) { // 3
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
          throw error_message
        } else if (diffHours < setting.AdvanceCancel) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      } else if (setting.Unit.AdvanceCancel.ShortName == 'M') { // 1
        var diffMinutes = startDateTime.getMinutes() - dateNow.getMinutes() // 2

        if (diffMinutes < 0) { // 3
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
          throw error_message
        } else if (diffMinutes < setting.AdvanceCancel) {
          error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
          throw error_message
        }
      }

      mysqlCon.beginTransaction(function (err) {
        if (err) {
          console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
          throw err
        }

        var sqlUpdateBooking = "update Booking set BookingStatus = ? where BookingId = ?"
        mysqlCon.query(sqlUpdateBooking, ["C", BookingId], function (err) {
          if (err) {
            mysqlCon.rollback(function () {
              console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
              error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
              return res.status(500).json({ "message": error_message })
            })
          }

          mysqlCon.commit(function (err) {
            if (err) {
              mysqlCon.rollback(function () {
                console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
                error_message = "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ"
                return res.status(500).json({ "message": error_message })
              })
            }

            return res.status(200).json({ "message": "ยกเลิกการจองสำเร็จ" })
          })
        })
      })
    } catch (err) {
      console.log("CATCH")
      return res.status(500).json({ "message": err })
    }
  })
}