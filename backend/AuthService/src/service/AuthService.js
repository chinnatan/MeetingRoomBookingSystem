const ldapClient = require("simple-ldap-client")
const config = require('../config')
const jwt = require("jsonwebtoken");

const NAME = "Auth Service";

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

exports.login = async (req, res) => {
    const url = config.ldap.url;
    const baseDn = config.ldap.baseDn;
    const upn = req.body.username + "@it.kmitl.ac.th";
    const password = req.body.password;

    // When Use Login Import MySQL
    const MySQL = require("mysql");

    // MySQL Option
    const HOST_MYSQL = config.mysql.HOST;
    const PORT_MYSQL = config.mysql.PORT;
    const USER_MYSQL = config.mysql.USERNAME;
    const PASS_MYSQL = config.mysql.PASSWORD;
    const DATA_MYSQL = config.mysql.DATABASE;

    // MySQL Connected
    var mysqlCon = MySQL.createConnection({
        host: HOST_MYSQL,
        port: PORT_MYSQL,
        user: USER_MYSQL,
        password: PASS_MYSQL,
        database: DATA_MYSQL,
        insecureAuth: true
    });

    mysqlCon.connect(async function (err) {
        if (err) {
            console.log(`[${NAME}] Error -> ${err.message}`);
            return res.status(500).json({ "message": "ไม่สามารถเชื่อมต่อฐานข้อมูลได้" })
        } else {
            console.log(`[${NAME}] Connected to Mysql -> ${HOST_MYSQL}:${PORT_MYSQL}`);

            // เมื่อเชื่อมต่อฐานข้อมูลสำเร็จ ยืนยัน username และ password ผ่าน ldap
            const client = new Client(url, baseDn);
            const isAuthenticated = await client.authenticate(upn, password);
            const SECRET = config.ldap.MY_SECRET

            // เมื่อยืนยันตัวตนสำเร็จ
            if (isAuthenticated) {
                console.log("+ Authenticated successfully");
                const userData = await client.getUser(upn, password);

                // ตรวจสอบว่า User Id นี้เคยเข้าสู่ระบบแล้วหรือไม่
                var sqlSelectUser = "select * from User where UserId = ?"
                mysqlCon.query(sqlSelectUser, [req.body.username], function (err, results) {
                    if (err) {
                        console.log(`[${NAME}] sqlSelectUser Error -> ${err}`)
                    } else {
                        // ถ้าเคยเข้าสู่ระบบเรียบร้อยแล้วให้ดึงข้อมูลจากฐานข้อมูลและ sign token
                        if (results.length) {
                            const payload = {
                                _id: results[0].UserId,
                                fullname: results[0].Fullname,
                                mail: results[0].Email,
                                status: results[0].Status,
                                role: results[0].Role,
                                iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                                exp: Math.floor(Date.now() / 1000) + (60 * 60)
                            };

                            jwt.sign(payload, SECRET, function (err, token) {
                                if (err) {
                                    throw new Error(err)
                                } else {
                                    return res.status(200).json({ "accesstoken": token, "message": "เข้าสู่ระบบสำเร็จ" })
                                }
                            })
                        } else { // ถ้าไม่เคยเข้าสู่ระบบเลยให้เพิ่มข้อมูลลงฐานข้อมูลและ sign token
                            var sqlInsertUser = "insert into User (UserId, Fullname, Email, Status, Role) values (?, ?, ?, ?, ?)"
                            mysqlCon.query(sqlInsertUser, [req.body.username, userData.name, userData.mail, 'OK', userData.description], function (err, results) {
                                if (err) {
                                    console.log(`[${NAME}] sqlInsertUser Error -> ${err}`)
                                } else {
                                    console.log("Insert User Success")

                                    const payload = {
                                        _id: req.body.username,
                                        fullname: userData.name,
                                        mail: userData.mail,
                                        status: 'OK',
                                        role: userData.description,
                                        iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60)
                                    };

                                    jwt.sign(payload, SECRET, function (err, token) {
                                        if (err) {
                                            throw new Error(err)
                                        } else {
                                            return res.status(200).json({ "accesstoken": token, "message": "เข้าสู่ระบบสำเร็จ" })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                console.log("- Authenticated unsuccessfully");
                return res.status(401).json({ "message": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
            }
        }
    });
}