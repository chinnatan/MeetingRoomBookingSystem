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
  str = str.toString();
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

  // var BookingTitle = req.body.BookingTitle
  // var BookingDetail = req.body.BookingDetail
  var BookingPin = generatePin(req.body.UserId)
  // var BookingDate = req.body.BookingDate
  var BookingStartDate = req.body.BookingStartDate
  var BookingEndDate = req.body.BookingEndDate
  var BookingStartTime = req.body.BookingStartTime
  var BookingEndTime = req.body.BookingEndTime
  // var BookingStatus = req.BookingStatus
  // var UserId = req.body.UserId
  // var RoomId = req.body.RoomId

  let [startDateYear, startDateMonth, startDateDay] = BookingStartDate.split('-')
  let [startTimeHour, startTimeMinute, startTimeSecond] = BookingStartTime.split(':')
  let [endDateYear, endDateMonth, endDateDay] = BookingEndDate.split('-')
  let [endTimeHour, endTimeMinute, endTimeSecond] = BookingEndTime.split(':')

  var startDateTime = new Date(startDateYear, startDateMonth, startDateDay, startTimeHour, startTimeMinute, startTimeSecond)
  var endDateTime = new Date(endDateYear, endDateMonth, endDateDay, endTimeHour, endTimeMinute, endTimeSecond)
  var dateNow = new Date()

  try {
    if (setting.Unit.AdvanceBooking.ShortName == 'D') {
      var diffDay = parseInt((startDateTime - dateNow) / (24 * 3600 * 1000))

      if (diffDay < setting.AdvanceBooking) {
        var message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'H') {
      var diffHours = startDateTime.getHours() - dateNow.getHours()

      if (diffHours < 0) {
        var message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw message
      } else if (diffHours < setting.AdvanceBooking) {
        var message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw message
      }
    } else if (setting.Unit.AdvanceBooking.ShortName == 'M') {
      var diffMinutes = startDateTime.getMinutes() - dateNow.getMinutes()

      if (diffMinutes < 0) {
        var message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
        throw message
      } else if (diffMinutes < setting.AdvanceBooking) {
        var message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
        throw message
      }
    }

    // คิดระยะเวลา
    var diffH = endDateTime.getHours() - startDateTime.getHours()
    var diffMin = Math.abs(endDateTime.getMinutes() - startDateTime.getMinutes())

    // คิดจำนวนวัน
    var diffDate = parseInt((endDateTime - startDateTime) / (24 * 3600 * 1000) + 1)

    // รวมชั่วโมงและนาทีเป็น string
    var diffTime = diffH.toString() + "." + diffMin.toString()

    // แปลงระยะเวลาเป็น float
    var diffTime = parseFloat(diffTime)

    // ตรวจสอบระยะเวลาและวันที่กับการตั้งค่าที่ระบบกำหนด
    if (diffTime < setting.HighestPeriodPerTime) {
      var message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"

      throw message
    } else if (diffDate > setting.HighestDatePerTime) {
      var message = "ไม่สามารถทำรายการได้ เนื่องจากวันที่ต้องการจองเกินกำหนด (" + setting.HighestDatePerTime + " " + setting.Unit.HighestDatePerTime + ")"

      throw message
    }
  } catch (err) {
    return res.status(200).json({ "message": err })
  }

  // เมื่อผ่านเงือนไขทั้งหมด
  return res.status(200).json({ "message": "เข้าสู่ระบบ" })

  // mysqlCon.beginTransaction(function(err) {
  //   if(err) {
  //     console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] ERROR -> ${err.message}`);
  //     throw err
  //   } else {
  //     var sqlInsertBooking = "insert into Booking "
  //   }
  // })
};