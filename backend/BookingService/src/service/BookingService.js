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

// -- FUNCTION -- //
function generatePin() {
    const FUNCTION_NAME = "GENERATE PIN"

    console.log(`[${SERVICE_NAME}][${FUNCTION_NAME}] -> Generate PIN`);
    var sixDigitPin = Math.floor(100000 + Math.random() * 900000);

    return sixDigitPin
}
// -- FUNCTION -- //

exports.addBooking = async (req, res) => {
    const API_NAME = "ADD BOOKING"

    var stateCheck = false

    if(req.body.isApplication) {
        stateCheck = true
    }

    // BOOKING //
    var BookingTitle = req.body.BookingTitle
    var BookingDetail = req.body.BookingDetail
    var BookingPin = generatePin()
    var BookingDate = new Date()
    var BookingStartDate = req.body.BookingStartDate
    var BookingEndDate = req.body.BookingStartDate
    var BookingStartTime = req.body.BookingStartTime
    var BookingEndTime = req.body.BookingEndTime
    var BookingStatus = "B"
    var BookingAttendees = req.body.BookingAttendees
    var UserId = req.body.UserId
    var UserEmail = req.body.UserEmail
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
    var currentDate = new Date()

    // --GET SETTING SYSTEM-- //
    const axios = require('axios')
    let settingRs
    let setting
    let userBannedRs
    let userBanned
    try {
        settingRs = await axios.get('http://localhost:4000/api/setting/')
        setting = {
            HighestPeriodPerTime: settingRs.data.HighestPeriodPerTime,
            AdvanceBooking: settingRs.data.AdvanceBooking,
            Unit: {
                HighestPeriodPerTime: settingRs.data.Unit.HighestPeriodPerTime,
                AdvanceBooking: {
                    ShortName: settingRs.data.Unit.AdvanceBooking.ShortName,
                    LongName: settingRs.data.Unit.AdvanceBooking.LongName
                }
            }
        }

        userBannedRs = await axios.get('http://localhost:4000/api/auth/user/ban/check/' + UserId)
        userBanned = userBannedRs.data.isBanned
    } catch (error) {
        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดความผิดพลาดของระบบ" })
    }
    // --GET SETTING SYSTEM-- //

    // --CONDITION BEFORE BOOKING-- //
    const moment = require('moment')

    if(userBanned) {
        return res.status(200).json({ "isBanned": userBanned})
    }

    try {
        var error_message

        if (setting.Unit.AdvanceBooking.ShortName == 'D') {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate()])
            var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()])
            diffDay = start.diff(current, 'days')

            if (diffDay < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceBooking.ShortName == 'H') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffHours = start.diff(current, 'hours', true)
            if (diffHours < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffHours < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceBooking.ShortName == 'M') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffMinute = start.diff(current, 'minutes', true)
            if (diffMinute < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffMinute < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        }

        if (endDateTime.getHours() == 0) {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
            var end = moment([endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(), 24, endDateTime.getMinutes()])
        } else {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
            var end = moment([endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(), endDateTime.getHours(), endDateTime.getMinutes()])
        }
        let diffTimePeriod = end.diff(start, 'hours', true)
        if (diffTimePeriod <= 0) {
            error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาเริ่มต้นใช้งานมากกว่าหรือเท่ากับเวลาสิ้นสุดการใช้งาน"
            throw error_message
        } else if (diffTimePeriod > setting.HighestPeriodPerTime) {
            error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"
            throw error_message
        }
    } catch (error) {
        return res.status(200).json({ "isError": true, "message": error_message })
    }
    // --CONDITION BEFORE BOOKING-- //

    var sqlQueryBookingSchedule = "select BookingStartDate, BookingEndDate from Booking where RoomId = ? and BookingStatus != ?"
    mysqlPool.query(sqlQueryBookingSchedule, [RoomId, "C"], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            for (var resultsIndex in results) {
                var first = moment(startDateTime).isBetween(results[resultsIndex].BookingStartDate, results[resultsIndex].BookingEndDate, null, '[)')
                var end = moment(endDateTime).isBetween(results[resultsIndex].BookingStartDate, results[resultsIndex].BookingEndDate, null, '(]')
                var error_message = "ไม่สามารถทำรายการได้ เนื่องจากมีผู้อื่นจองช่วงเวลานั้นเรียบร้อยแล้ว"
                if (first == false && end == true) {
                    return res.status(200).json({ "isError": true, "message": error_message })
                } else if (first && end) {
                    return res.status(200).json({ "isError": true, "message": error_message })
                } else if (first == true && end == false) {
                    return res.status(200).json({ "isError": true, "message": error_message })
                }
            }

            mysqlPool.getConnection(function (err, connection) {
                if (err) {
                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL CONNECTION ERROR -> ${err}`);
                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                }

                connection.beginTransaction(function (err) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
                        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    var sqlInsertBooking = "insert into Booking (BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStatus, BookingAttendees, UserId, RoomId) values (?,?,?,?,?,?,?,?,?,?)"
                    connection.query(sqlInsertBooking, [BookingTitle, BookingDetail, BookingPin, BookingDate, startDateTime, endDateTime, BookingStatus, BookingAttendees, UserId, RoomId], function (err, results) {
                        if (err) {
                            connection.rollback(function () {
                                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL INSERT ERROR -> ${err}`);
                                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                        }

                        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
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

                        var sqlQueryRoom = "select RoomName from Room where RoomId = ?"
                        connection.query(sqlQueryRoom, [RoomId], function (err, results) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            if (results.length) {
                                var roomName = results[0].RoomName
                                let addMailOptions = {
                                    from: Config.GMAIL.USER,                // sender
                                    to: UserEmail,                // list of receivers
                                    subject: `[MRBS] รหัสผ่านสำหรับการเข้าใช้งานห้อง ${roomName}`,              // Mail subject
                                    html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
                                    <b>หัวข้อการจอง : </b>${BookingTitle}<br>
                                    <b>วัน และเวลาจอง : </b>${moment(startDateTime).format("D MMMM YYYY kk:mm")} - ${moment(endDateTime).format("D MMMM YYYY kk:mm")}<br>
                                    <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
                                };

                                transporter.sendMail(addMailOptions, function (err, info) {
                                    if (err) {
                                        connection.rollback(function () {
                                            console.log(`[TRANSPORTER][ADD MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                                            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                        })
                                    } else {
                                        console.log(info);
                                        transporter.close(); // shut down the connection pool, no more messages
                                    }
                                });
                            }
                        })

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            console.log(`[${SERVICE_NAME}][${API_NAME}] -> "Booking Successfully"`);

                            axios.get('http://localhost:4001/api/trigger/booking');

                            return res.status(200).json({ "isError": false, "pin": BookingPin, "message": "จองห้องสำเร็จ" })
                        })
                    })
                })
            })
        } else {
            mysqlPool.getConnection(function (err, connection) {
                if (err) {
                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL CONNECTION ERROR -> ${err}`);
                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                }

                connection.beginTransaction(function (err) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
                        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    var sqlInsertBooking = "insert into Booking (BookingTitle, BookingDetail, BookingPin, BookingDate, BookingStartDate, BookingEndDate, BookingStatus, BookingAttendees, UserId, RoomId) values (?,?,?,?,?,?,?,?,?,?)"
                    connection.query(sqlInsertBooking, [BookingTitle, BookingDetail, BookingPin, BookingDate, startDateTime, endDateTime, BookingStatus, BookingAttendees, UserId, RoomId], function (err, results) {
                        if (err) {
                            connection.rollback(function () {
                                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL INSERT ERROR -> ${err}`);
                                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                        }

                        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
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

                        var sqlQueryRoom = "select RoomName from Room where RoomId = ?"
                        connection.query(sqlQueryRoom, [RoomId], function (err, results) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            if (results.length) {
                                var roomName = results[0].RoomName
                                let addMailOptions = {
                                    from: Config.GMAIL.USER,                // sender
                                    to: '59070040@it.kmitl.ac.th',                // list of receivers
                                    subject: `[MRBS] รหัสผ่านสำหรับการเข้าใช้งานห้อง ${roomName}`,              // Mail subject
                                    html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
                                    <b>หัวข้อการจอง : </b>${BookingTitle}<br>
                                    <b>วัน และเวลาจอง : </b>${moment(startDateTime).format("D MMMM YYYY kk:mm")} - ${moment(endDateTime).format("D MMMM YYYY kk:mm")}<br>
                                    <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
                                };

                                transporter.sendMail(addMailOptions, function (err, info) {
                                    if (err) {
                                        connection.rollback(function () {
                                            console.log(`[TRANSPORTER][ADD MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                                            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                        })
                                    } else {
                                        console.log(info);
                                        transporter.close(); // shut down the connection pool, no more messages
                                    }
                                });
                            }
                        })

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            console.log(`[${SERVICE_NAME}][${API_NAME}] -> "Booking Successfully"`);

                            return res.status(200).json({ "isError": false, "pin": BookingPin, "message": "จองห้องสำเร็จ" })
                        })
                    })
                })
            })
        }
    })
}

exports.editBooking = async (req, res) => {
    const API_NAME = "EDIT BOOKING"

    // BOOKING //
    var BookingId = req.body.BookingId
    var BookingTitle = req.body.BookingTitle
    var BookingDetail = req.body.BookingDetail
    var BookingDate = new Date()
    var BookingStartDate = req.body.BookingStartDate
    var BookingEndDate = req.body.BookingStartDate
    var BookingStartTime = req.body.BookingStartTime
    var BookingEndTime = req.body.BookingEndTime
    var BookingAttendees = req.body.BookingAttendees
    var UserEmail = req.body.UserEmail
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
    var currentDate = new Date()

    // --GET SETTING SYSTEM-- //
    const axios = require('axios')
    let settingRs
    let setting
    try {
        settingRs = await axios.get('http://localhost:4000/api/setting/')
        setting = {
            HighestPeriodPerTime: settingRs.data.HighestPeriodPerTime,
            AdvanceBooking: settingRs.data.AdvanceBooking,
            Unit: {
                HighestPeriodPerTime: settingRs.data.Unit.HighestPeriodPerTime,
                AdvanceBooking: {
                    ShortName: settingRs.data.Unit.AdvanceBooking.ShortName,
                    LongName: settingRs.data.Unit.AdvanceBooking.LongName
                }
            }
        }

    } catch (error) {
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดความผิดพลาดของระบบ" })
    }
    // --GET SETTING SYSTEM-- //

    // --CONDITION BEFORE BOOKING-- //
    const moment = require('moment')

    try {
        var error_message

        if (setting.Unit.AdvanceBooking.ShortName == 'D') {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate()])
            var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()])
            diffDay = start.diff(current, 'days')

            if (diffDay < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceBooking.ShortName == 'H') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffHours = start.diff(current, 'hours', true)
            if (diffHours < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffHours < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceBooking.ShortName == 'M') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffMinute = start.diff(current, 'minutes', true)
            if (diffMinute < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการจองผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffMinute < setting.AdvanceBooking) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการจองล่วงหน้าก่อน " + setting.AdvanceBooking + " " + setting.Unit.AdvanceBooking.LongName
                throw error_message
            }
        }

        if (endDateTime.getHours() == 0) {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
            var end = moment([endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(), 24, endDateTime.getMinutes()])
        } else {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
            var end = moment([endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate(), endDateTime.getHours(), endDateTime.getMinutes()])
        }
        let diffTimePeriod = end.diff(start, 'hours', true)
        if (diffTimePeriod <= 0) {
            error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาเริ่มต้นใช้งานมากกว่าหรือเท่ากับเวลาสิ้นสุดการใช้งาน"
            throw error_message
        } else if (diffTimePeriod > setting.HighestPeriodPerTime) {
            error_message = "ไม่สามารถทำรายการได้ เนื่องจากระยะเวลาที่ต้องการจองเกินกำหนด (" + setting.HighestPeriodPerTime + " " + setting.Unit.HighestPeriodPerTime + ")"
            throw error_message
        }
    } catch (error) {
        return res.status(200).json({ "error_message": error_message })
    }
    // --CONDITION BEFORE BOOKING-- //

    var sqlQueryBookingSchedule = "select BookingStartDate, BookingEndDate from Booking where RoomId = ? and BookingStatus != ?"
    mysqlPool.query(sqlQueryBookingSchedule, [RoomId, "C"], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err}`);
            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            for (var resultsIndex in results) {
                var first = moment(startDateTime).isBetween(results[resultsIndex].BookingStartDate, results[resultsIndex].BookingEndDate, null, '[)')
                var end = moment(endDateTime).isBetween(results[resultsIndex].BookingStartDate, results[resultsIndex].BookingEndDate, null, '(]')
                var error_message = "ไม่สามารถทำรายการได้ เนื่องจากมีผู้อื่นจองช่วงเวลานั้นเรียบร้อยแล้ว"
                if (first == false && end == true) {
                    console.log("FIRST")
                    return res.status(200).json({ "error_message": error_message })
                } else if (first && end) {
                    return res.status(200).json({ "error_message": error_message })
                } else if (first == true && end == false) {
                    return res.status(200).json({ "error_message": error_message })
                }
            }

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

                    var sqlUpdateBooking = "update Booking set BookingTitle = ?, BookingDetail = ?, BookingDate = ?, BookingStartDate = ?, BookingEndDate = ?, BookingAttendees = ? where BookingId = ?"
                    connection.query(sqlUpdateBooking, [BookingTitle, BookingDetail, BookingDate, startDateTime, endDateTime, BookingAttendees, BookingId], function (err, results) {
                        if (err) {
                            connection.rollback(function () {
                                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE ERROR -> ${err}`);
                                return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                        }

                        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
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

                        var sqlQueryRoom = "select Room.RoomName, Booking.BookingPin from Room join Booking on (Room.RoomId = Booking.RoomId) where Room.RoomId = ? and BookingId = ?"
                        connection.query(sqlQueryRoom, [RoomId, BookingId], function (err, results) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                                    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            if (results.length) {
                                var roomName = results[0].RoomName
                                var BookingPin = results[0].BookingPin
                                let editMailOption = {
                                    from: Config.GMAIL.USER,                // sender
                                    to: '59070040@it.kmitl.ac.th',                // list of receivers
                                    subject: `[MRBS][แก้ไข] รายละเอียดการจองที่ได้รับการแก้ไขของห้อง ${roomName}`,              // Mail subject
                                    html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
                                    <b>หัวข้อการจอง : </b>${BookingTitle}<br>
                                    <b>วัน และเวลาจอง : </b>${moment(startDateTime).format("D MMMM YYYY kk:mm")} - ${moment(endDateTime).format("D MMMM YYYY kk:mm")}<br>
                                    <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
                                };

                                transporter.sendMail(editMailOption, function (err, info) {
                                    if (err) {
                                        connection.rollback(function () {
                                            console.log(`[TRANSPORTER][EDIT MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                        })
                                    } else {
                                        console.log(info);
                                        transporter.close(); // shut down the connection pool, no more messages
                                    }
                                });
                            }
                        })

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                                    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            console.log(`[${SERVICE_NAME}][${API_NAME}] -> "Edit Booking Successfully"`);

                            res.status(200).json({ "message": "แก้ไขการจองสำเร็จ" })
                        })
                    })
                })
            })
        } else {
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

                    var sqlUpdateBooking = "update Booking set BookingTitle = ?, BookingDetail = ?, BookingDate = ?, BookingStartDate = ?, BookingEndDate = ?, BookingAttendees = ? where BookingId = ?"
                    connection.query(sqlUpdateBooking, [BookingTitle, BookingDetail, BookingDate, startDateTime, endDateTime, BookingAttendees, BookingId], function (err, results) {
                        if (err) {
                            connection.rollback(function () {
                                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE ERROR -> ${err}`);
                                return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                            })
                        }

                        // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
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

                        var sqlQueryRoom = "select Room.RoomName, Booking.BookingPin from Room join Booking on (Room.RoomId = Booking.RoomId) where Room.RoomId = ? and BookingId = ?"
                        connection.query(sqlQueryRoom, [RoomId, BookingId], function (err, results) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                                    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            if (results.length) {
                                var roomName = results[0].RoomName
                                var BookingPin = results[0].BookingPin
                                let editMailOption = {
                                    from: Config.GMAIL.USER,                // sender
                                    to: UserEmail,                // list of receivers
                                    subject: `[MRBS][แก้ไข] รายละเอียดการจองที่ได้รับการแก้ไขของห้อง ${roomName}`,              // Mail subject
                                    html: `<b>ห้องที่ทำการจอง : </b>${roomName}<br>
                                    <b>หัวข้อการจอง : </b>${BookingTitle}<br>
                                    <b>วัน และเวลาจอง : </b>${moment(startDateTime).format("D MMMM YYYY kk:mm")} - ${moment(endDateTime).format("D MMMM YYYY kk:mm")}<br>
                                    <b>รหัสผ่านสำหรับการเข้าใช้งานห้อง : </b>${BookingPin}`   // HTML body
                                };

                                transporter.sendMail(editMailOption, function (err, info) {
                                    if (err) {
                                        connection.rollback(function () {
                                            console.log(`[TRANSPORTER][EDIT MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                        })
                                    } else {
                                        console.log(info);
                                        transporter.close(); // shut down the connection pool, no more messages
                                    }
                                });
                            }
                        })

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                                    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            console.log(`[${SERVICE_NAME}][${API_NAME}] -> "Edit Booking Successfully"`);

                            res.status(200).json({ "message": "แก้ไขการจองสำเร็จ" })
                        })
                    })
                })
            })
        }
    })
}

exports.cancelBooking = async (req, res) => {
    const API_NAME = "CANCEL BOOKING"

    var bookingId = req.body.BookingId
    var UserEmail = req.body.UserEmail

    // --GET SETTING SYSTEM AND BOOKING-- //
    const axios = require('axios')
    let settingRs
    let setting
    let bookingRs
    let booking
    try {
        settingRs = await axios.get('http://localhost:4000/api/setting/')
        bookingRs = await axios.get('http://localhost:4000/api/booking/' + bookingId)

        setting = {
            AdvanceCancel: settingRs.data.AdvanceCancel,
            Unit: {
                AdvanceCancel: {
                    ShortName: settingRs.data.Unit.AdvanceCancel.ShortName,
                    LongName: settingRs.data.Unit.AdvanceCancel.LongName
                }
            }
        }

        booking = {
            BookingId: bookingRs.data[0].BookingId,
            BookingTitle: bookingRs.data[0].BookingTitle,
            BookingStartDate: bookingRs.data[0].BookingStartDate,
            BookingEndDate: bookingRs.data[0].BookingEndDate,
            RoomName: bookingRs.data[0].RoomName
        }
    } catch (error) {
        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดความผิดพลาดของระบบ" })
    }
    // --GET SETTING SYSTEM AND BOOKING-- //

    var startDateTime = new Date(booking.BookingStartDate)
    var endDateTime = new Date(booking.BookingEndDate)
    var currentDate = new Date()

    // --CONDITION BEFORE BOOKING-- //
    const moment = require('moment')

    try {
        var error_message

        if (setting.Unit.AdvanceCancel.ShortName == 'D') {
            var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate()])
            var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()])
            diffDay = start.diff(current, 'days')

            if (diffDay < setting.AdvanceCancel) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceCancel.ShortName == 'H') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffHours = start.diff(current, 'hours', true)
            if (diffHours < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffHours < setting.AdvanceCancel) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
                throw error_message
            }
        } else if (setting.Unit.AdvanceCancel.ShortName == 'M') {
            if (currentDate.getHours() == 0) {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 24, currentDate.getMinutes()])
            } else {
                var start = moment([startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate(), startDateTime.getHours(), startDateTime.getMinutes()])
                var current = moment([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()])
            }
            let diffMinute = start.diff(current, 'minutes', true)
            if (diffMinute < 0) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากเวลาที่ต้องการยกเลิกผ่านมาเรียบร้อยแล้ว"
                throw error_message
            } else if (diffMinute < setting.AdvanceCancel) {
                error_message = "ไม่สามารถทำรายการได้ เนื่องจากต้องทำการยกเลิกล่วงหน้าก่อน " + setting.AdvanceCancel + " " + setting.Unit.AdvanceCancel.LongName
                throw error_message
            }
        }
    } catch (error) {
        return res.status(200).json({ "error_message": error_message })
    }
    // --CONDITION BEFORE BOOKING-- //

    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL POOL GET CONNECTION ERROR -> ${err.message}`);
            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        connection.beginTransaction(function (err) {
            if (err) {
                connection.rollback(function () {
                    console.log(`[${SERVICE_NAME}][${API_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err.message}`);
                    return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                })
            }

            var sqlUpdateCancelBooking = "update Booking set BookingStatus = ? where BookingId = ?"
            connection.query(sqlUpdateCancelBooking, ["C", bookingId], function (err, results) {
                if (err) {
                    connection.rollback(function () {
                        console.log(`[${SERVICE_NAME}][${API_NAME}] SQL UPDATE CANCEL BOOKING ERROR -> ${err.message}`);
                        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    })
                }

                // ส่งรหัสผ่านสำหรับการเข้าใช้งานห้องไปที่ Email ของผู้ใช้งาน
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

                let cancelMailOption = {
                    from: Config.GMAIL.USER,                // sender
                    to: UserEmail,                // list of receivers
                    subject: `[MRBS][ยกเลิก] รายละเอียดการยกเลิกการจองของห้อง ${booking.RoomName}`,              // Mail subject
                    html: `<b>ห้องที่ทำการจอง : </b>${booking.RoomName} <font color='red'>ยกเลิก</font><br>
                    <b>หัวข้อการจอง : </b>${booking.BookingTitle} <font color='red'>ยกเลิก</font><br>
                    <b>วัน และเวลาจอง : </b>${moment(startDateTime).format("D MMMM YYYY kk:mm")} - ${moment(endDateTime).format("D MMMM YYYY kk:mm")} <font color='red'>ยกเลิก</font>`
                };

                transporter.sendMail(cancelMailOption, function (err, info) {
                    if (err) {
                        connection.rollback(function () {
                            console.log(`[TRANSPORTER][CANCEL MAIL OPTION] SEND MAIL ERROR -> ${err.message}`);
                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                        })
                    } else {
                        console.log(info);
                        transporter.close(); // shut down the connection pool, no more messages
                    }
                });

                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                        })
                    }

                    console.log(`[${SERVICE_NAME}][${API_NAME}] -> "Cancel Booking Successfully"`);

                    res.status(200).json({ "isCancel": true, "message": "ยกเลิกการจองสำเร็จ" })
                })
            })
        })
    })
}

exports.getBookingByUserId = (req, res) => {
    const API_NAME = "GET BOOKING BY USER ID"

    var userId = req.params.userId

    var sqlQueryBookingByUserId = "select * from Booking join Room on (Booking.RoomId = Room.RoomId) where UserId = ? and BookingStatus = ? and BookingStartDate >= Sysdate()"
    mysqlPool.query(sqlQueryBookingByUserId, [userId, "B"], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            return res.status(200).json(results)
        } else {
            return res.status(200).json({ "message": "ไม่พบรายการการจองห้องของคุณ หรือคุณอาจจะยังไม่เคยทำการจองห้อง" })
        }
    })
}

exports.getBookingByBookingId = (req, res) => {
    const API_NAME = "GET BOOKING BY BOOKING ID"

    var bookingId = req.params.bookingId

    var sqlQueryBookingByBookingId = "select * from Booking join Room on (Booking.RoomId = Room.RoomId) where BookingId = ?"
    mysqlPool.query(sqlQueryBookingByBookingId, [bookingId], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            return res.status(200).json(results)
        } else {
            return res.status(200).json({ "message": "ไม่พบรายการการจองห้องของคุณ หรือคุณอาจจะยังไม่เคยทำการจองห้อง" })
        }
    })
}

// --สำหรับผู้ดูแลระบบ-- //
exports.summaryBooking = (req, res) => {
    const API_NAME = "SUMMARY BOOKING"

    let isAdmin = req.body.isAdmin

    if (isAdmin) {
        var sqlQueryBooking = "select b.BookingTitle, r.RoomName, b.BookingDate, u.Fullname, b.BookingStatus from Booking b join User u on (b.UserId = u.UserId) join Room r on (r.RoomId = b.RoomId) order by BookingDate asc"
        mysqlPool.query(sqlQueryBooking, function (err, results) {
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
// --สำหรับผู้ดูแลระบบ-- //