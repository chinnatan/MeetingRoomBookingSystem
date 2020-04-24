const ldapClient = require("simple-ldap-client")
const MySQL = require('mysql')
const Config = require('../../config')
const jwt = require("jsonwebtoken");

const SERVICE_NAME = Config.SERVER.NAME;

class Client {
    constructor(url, baseDn) {
        this.ldap = new ldapClient(url, baseDn);
    }

    async authenticate(upn, password) {
        try {
            await this.ldap.authenticate({ upn, password });
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }

    async getUser(upn, password) {
        const result = await this.ldap.getUser({ upn, password });
        return result;
    }
}

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

// Run Check Ban Every Day
var cron = require('node-cron');
cron.schedule('0 0 0 * * *', function () {
    console.log(`[${SERVICE_NAME}] running a check ban user every day`);

    var sqlQueryBooking = "select distinct u.UserId from Booking b " +
        "join User u on (u.UserId = b.UserId)  " +
        "where b.BookingStatus not in ('C', 'U') and u.Role != 'Admin' and u.BannedStatus = 0"
    mysqlPool.query(sqlQueryBooking, function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}] sqlQueryBooking Error -> ${err}`)
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            for (var index in results) {
                let UserId = results[index].UserId
                console.log(`[${SERVICE_NAME}] Found : ${UserId}`)

                mysqlPool.getConnection(function (err, connection) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}] Error -> ${err.message}`);
                        return res.status(500).json({ "isError": true, "message": "ไม่สามารถเชื่อมต่อฐานข้อมูลได้" })
                    }

                    connection.beginTransaction(function (err) {
                        if (err) {
                            console.log(`[${SERVICE_NAME}] SQL BEGIN TRANSACTION ERROR -> ${err}`);
                            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                        }

                        var sqlBanUser = "update User set BannedStatus = 1, BannedDate = ? where UserId = ?"
                        connection.query(sqlBanUser, [new Date(), UserId], function (err, results) {
                            if (err) {
                                connection.rollback(function () {
                                    console.log(`[${SERVICE_NAME}] sqlBanUser Error -> ${err}`)
                                    return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                })
                            }

                            var sqlQueryBookingForDelete = "select * from Booking where UserId = ?"
                            connection.query(sqlQueryBookingForDelete, [UserId], function (err, results) {
                                if (err) {
                                    connection.rollback(function () {
                                        console.log(`[${SERVICE_NAME}] sqlQueryBookingForDelete Error -> ${err}`)
                                        return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                    })
                                }

                                if (results.length > 0) {
                                    for(var index in results) {
                                        let BookingId = results[index].BookingId
                                        var sqlDeleteBooking = "delete from Booking where BookingId = ? and BookingStatus = ? and UserId = ?"
                                        connection.query(sqlDeleteBooking, [BookingId, "B", UserId], function(err) {
                                            if (err) {
                                                connection.rollback(function () {
                                                    console.log(`[${SERVICE_NAME}] sqlDeleteBooking Error -> ${err}`)
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

                                        console.log(`[${SERVICE_NAME}] ${UserId} is Banned.`)
                                    })
                                } else {
                                    connection.commit(function (err) {
                                        if (err) {
                                            connection.rollback(function () {
                                                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL COMMIT ERROR -> ${err.message}`);
                                                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                                            })
                                        }

                                        console.log(`[${SERVICE_NAME}] ${UserId} is Banned.`)
                                    })
                                }
                            })
                        })
                    })
                })
            }
        }
    })
});


exports.login = async (req, res) => {
    const url = Config.ldap.url;
    const baseDn = Config.ldap.baseDn;
    const upn = req.body.username + "@it.kmitl.ac.th";
    const password = req.body.password;

    mysqlPool.getConnection(async function (err, connection) {
        if (err) {
            console.log(`[${SERVICE_NAME}] Error -> ${err.message}`);
            return res.status(500).json({ "message": "ไม่สามารถเชื่อมต่อฐานข้อมูลได้" })
        } else {

            // --CASE 1 ไม่ทราบ Role ของบาง Actor-- //
            const SECRET = Config.ldap.MY_SECRET

            if (req.body.username == "admin" && password == "zkcnt") {
                var sqlSelectUser = "select * from User where UserId = ?"
                connection.query(sqlSelectUser, [req.body.username], function (err, results) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}] sqlSelectUser Error -> ${err}`)
                        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
                    if (results.length) {
                        const payload = {
                            _id: results[0].UserId,
                            fullname: results[0].Fullname,
                            mail: results[0].Email,
                            banned: results[0].BannedStatus,
                            role: results[0].Role,
                            isAdmin: true,
                            iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        };

                        jwt.sign(payload, SECRET, function (err, token) {
                            if (err) {
                                throw new Error(err)
                            } else {
                                return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": true }, "message": "เข้าสู่ระบบสำเร็จ" })
                            }
                        })
                    } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
                        console.log("- Authenticated unsuccessfully");
                        return res.status(200).json({ "accesstoken": false, "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
                    }

                })
            } else if (req.body.username == "staff" && password == "staff") {
                var sqlSelectUser = "select * from User where UserId = ?"
                connection.query(sqlSelectUser, [req.body.username], function (err, results) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}] sqlSelectUser Error -> ${err}`)
                        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
                    if (results.length) {
                        const payload = {
                            _id: results[0].UserId,
                            fullname: results[0].Fullname,
                            mail: results[0].Email,
                            banned: results[0].BannedStatus,
                            role: results[0].Role,
                            isAdmin: false,
                            iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        };

                        jwt.sign(payload, SECRET, function (err, token) {
                            if (err) {
                                throw new Error(err)
                            } else {
                                return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
                            }
                        })
                    } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
                        console.log("- Authenticated unsuccessfully");
                        return res.status(200).json({ "accesstoken": false, "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
                    }

                })
            } else if (req.body.username == "professor" && password == "professor") {
                var sqlSelectUser = "select * from User where UserId = ?"
                connection.query(sqlSelectUser, [req.body.username], function (err, results) {
                    if (err) {
                        console.log(`[${SERVICE_NAME}] sqlSelectUser Error -> ${err}`)
                        return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                    }

                    // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
                    if (results.length) {
                        const payload = {
                            _id: results[0].UserId,
                            fullname: results[0].Fullname,
                            mail: results[0].Email,
                            banned: results[0].BannedStatus,
                            role: results[0].Role,
                            isAdmin: false,
                            iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        };

                        jwt.sign(payload, SECRET, function (err, token) {
                            if (err) {
                                throw new Error(err)
                            } else {
                                return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
                            }
                        })
                    } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
                        console.log("- Authenticated unsuccessfully");
                        return res.status(200).json({ "accesstoken": false, "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
                    }

                })
            } else {
                // เมื่อเชื่อมต่อฐานข้อมูลสำเร็จ ยืนยัน username และ password ผ่าน ldap
                const client = new Client(url, baseDn);
                const isAuthenticated = await client.authenticate(upn, password);
                const SECRET = Config.ldap.MY_SECRET

                if (isAuthenticated) {
                    console.log("+ Authenticated successfully");
                    // const userData = await client.getUser(upn, password);
                    const userData = client.getUser(upn, password);

                    // ตรวจสอบว่า User Id นี้เคยเข้าสู่ระบบแล้วหรือไม่
                    var sqlSelectUser = "select * from User where UserId = ?"
                    connection.query(sqlSelectUser, [req.body.username], function (err, results) {
                        if (err) {
                            console.log(`[${SERVICE_NAME}] sqlSelectUser Error -> ${err}`)
                            return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
                        }

                        // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
                        if (results.length) {
                            const payload = {
                                _id: results[0].UserId,
                                fullname: results[0].Fullname,
                                mail: results[0].Email,
                                banned: results[0].BannedStatus,
                                role: results[0].Role,
                                iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                                exp: Math.floor(Date.now() / 1000) + (60 * 60)
                            };

                            jwt.sign(payload, SECRET, function (err, token) {
                                if (err) {
                                    console.log(err)
                                    throw new Error(err)
                                } else {
                                    return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
                                }
                            })
                        } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
                            var sqlInsertUser = "insert into User (UserId, Fullname, Email, BannedStatus, BannedDate, Role) values (?, ?, ?, ?, ?)"
                            connection.query(sqlInsertUser, [req.body.username, userData.name, userData.mail, false, null, userData.description], function (err, results) {
                                if (err) {
                                    console.log(`[${SERVICE_NAME}] sqlInsertUser Error -> ${err}`)
                                } else {
                                    console.log("Insert User Success")

                                    const payload = {
                                        _id: req.body.username,
                                        fullname: userData.name,
                                        mail: userData.mail,
                                        banned: false,
                                        role: userData.description,
                                        iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60)
                                    };

                                    jwt.sign(payload, SECRET, function (err, token) {
                                        if (err) {
                                            throw new Error(err)
                                        } else {
                                            return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
                                        }
                                    })
                                }
                            })
                        }

                    })
                } else {
                    console.log("- Authenticated unsuccessfully");
                    return res.status(200).json({ "accesstoken": false, "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
                }
            }
            // --CASE 1 ไม่ทราบ Role ของบาง Actor-- //

            // --CASE 2 ทราบ Role ของทุก Actor เรียบร้อยแล้ว-- //

            // เมื่อเชื่อมต่อฐานข้อมูลสำเร็จ ยืนยัน username และ password ผ่าน ldap
            // const client = new Client(url, baseDn);
            // const isAuthenticated = await client.authenticate(upn, password);
            // const SECRET = Config.ldap.MY_SECRET

            // if (isAuthenticated) {
            //     console.log("+ Authenticated successfully");
            //     const userData = await client.getUser(upn, password);

            //     // ตรวจสอบว่า User Id นี้เคยเข้าสู่ระบบแล้วหรือไม่
            //     var sqlSelectUser = "select * from User where UserId = ?"
            //     mysqlPool.query(sqlSelectUser, [req.body.username], function (err, results) {
            //         if (err) {
            //             console.log(`[${NAME}] sqlSelectUser Error -> ${err}`)
            //             return res.status(200).json({ "error_message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            //         }

            //         // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
            //         if (results.length) {
            //             const payload = {
            //                 _id: results[0].UserId,
            //                 fullname: results[0].Fullname,
            //                 mail: results[0].Email,
            //                 banned: results[0].BannedStatus,
            //                 role: results[0].Role,
            //                 iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
            //                 exp: Math.floor(Date.now() / 1000) + (60 * 60)
            //             };

            //             jwt.sign(payload, SECRET, function (err, token) {
            //                 if (err) {
            //                     throw new Error(err)
            //                 } else {
            //                     return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
            //                 }
            //             })
            //         } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
            //             var sqlInsertUser = "insert into User (UserId, Fullname, Email, BannedStatus, BannedDate, Role) values (?, ?, ?, ?, ?)"
            //             mysqlPool.query(sqlInsertUser, [req.body.username, userData.name, userData.mail, false, null, userData.description], function (err, results) {
            //                 if (err) {
            //                     console.log(`[${NAME}] sqlInsertUser Error -> ${err}`)
            //                 } else {
            //                     console.log("Insert User Success")

            //                     const payload = {
            //                         _id: req.body.username,
            //                         fullname: userData.name,
            //                         mail: userData.mail,
            //                         banned: false,
            //                         role: userData.description,
            //                         iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
            //                         exp: Math.floor(Date.now() / 1000) + (60 * 60)
            //                     };

            //                     jwt.sign(payload, SECRET, function (err, token) {
            //                         if (err) {
            //                             throw new Error(err)
            //                         } else {
            //                             return res.status(200).json({ "accesstoken": token, "user": { "id": results[0].UserId, "fullname": results[0].Fullname, "mail": results[0].Email, "banned": results[0].BannedStatus, "role": results[0].Role, "isAdmin": false }, "message": "เข้าสู่ระบบสำเร็จ" })
            //                         }
            //                     })
            //                 }
            //             })
            //         }

            //     })
            // } else {
            //     console.log("- Authenticated unsuccessfully");
            //     return res.status(200).json({ "accesstoken": false, "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
            // }
            // --CASE 2 ทราบ Role ของทุก Actor เรียบร้อยแล้ว-- //
        }
    });
}

exports.checkBanned = (req, res) => {
    const API_NAME = "CHECK BANNED"

    let UserId = req.params.UserId

    var sqlCheckUserBan = "select * from User where UserId = ? and BannedStatus = ?"
    mysqlPool.query(sqlCheckUserBan, [UserId, 1], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            return res.status(200).json({ "isError": false, "isBanned": true })
        } else {
            return res.status(200).json({ "isError": false, "isBanned": false })
        }
    })
}

exports.getUserByUserId = (req, res) => {
    const API_NAME = "GET USER BY USER ID"

    let userId = req.params.UserId;

    var sqlQueryUser = "select * from User where UserId = ?"
    mysqlPool.query(sqlQueryUser, [userId], function (err, results) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
            return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
        }

        if (results.length > 0) {
            return res.status(200).json({ "isError": false, "results": results })
        } else {
            return res.status(200).json({ "isError": true, "message": "ไม่พบผู้ใช้งานในระบบ" })
        }
    })
}

// --สำหรับผู้ดูแลระบบ-- //
exports.getAllUser = (req, res) => {
    const API_NAME = "GET ALL USER"

    let isAdmin = req.body.isAdmin

    if (isAdmin) {
        var sqlQueryUser = "select * from User"
        mysqlPool.query(sqlQueryUser, function (err, results) {
            if (err) {
                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            }

            if (results.length > 0) {
                return res.status(200).json({ "isError": false, "results": results })
            } else {
                return res.status(200).json({ "isError": true, "message": "ไม่พบผู้ใช้งานในระบบ" })
            }
        })
    } else {
        return res.status(403).send()
    }
}

exports.banned = (req, res) => {
    const API_NAME = "BANNED"

    let UserId = req.body.UserId
    let isAdmin = req.body.isAdmin

    if (isAdmin) {
        var sqlBannedUser = "update User set BannedStatus = ?, BannedDate = ? where UserId = ?"
        mysqlPool.query(sqlBannedUser, [1, new Date(), UserId], function (err, results) {
            if (err) {
                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            }

            return res.status(200).json({ "isError": false, "message": "จำกัดสิทธิ์การเข้าใช้งานสำเร็จ" })
        })
    } else {
        return res.status(403).send()
    }
}

exports.unbanned = (req, res) => {
    const API_NAME = "UN BANNED"

    let UserId = req.body.UserId
    let isAdmin = req.body.isAdmin

    if (isAdmin) {
        var sqlBannedUser = "update User set BannedStatus = ?, BannedDate = ? where UserId = ?"
        mysqlPool.query(sqlBannedUser, [0, null, UserId], function (err, results) {
            if (err) {
                console.log(`[${SERVICE_NAME}][${API_NAME}] SQL QUERY ERROR -> ${err.message}`);
                return res.status(200).json({ "isError": true, "message": "ไม่สามารถทำรายการได้เนื่องจากเกิดจากความผิดพลาดของระบบ" })
            }

            return res.status(200).json({ "isError": false, "message": "ยกเลิกจำกัดสิทธิ์การเข้าใช้งานสำเร็จ" })
        })
    } else {
        return res.status(403).send()
    }
}
// --สำหรับผู้ดูแลระบบ-- //