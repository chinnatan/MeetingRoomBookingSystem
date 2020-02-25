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
            console.log(`[${SERVICE_NAME}] Connected to Mysql -> ${HOST_MYSQL}:${PORT_MYSQL}`);

            // เมื่อเชื่อมต่อฐานข้อมูลสำเร็จ ยืนยัน username และ password ผ่าน ldap
            const client = new Client(url, baseDn);
            const isAuthenticated = await client.authenticate(upn, password);
            const SECRET = Config.ldap.MY_SECRET

            // --CASE 1 ไม่ทราบ Role ของบาง Actor-- //
            if (req.body.username == "admin" && password == "admin") {
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
                if (isAuthenticated) {
                    console.log("+ Authenticated successfully");
                    const userData = await client.getUser(upn, password);

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