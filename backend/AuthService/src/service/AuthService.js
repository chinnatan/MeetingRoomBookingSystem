const ldapClient = require("simple-ldap-client")
const config = require('../config')
const jwt = require("jwt-simple");

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
    const url = config.url;
    const baseDn = config.baseDn;
    const upn = req.body.username + "@it.kmitl.ac.th";
    const password = req.body.password;

    const client = new Client(url, baseDn);
    const isAuthenticated = await client.authenticate(upn, password);

    const payload = {
        sub: req.body.username,
        iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
     };
     const SECRET = config.MY_SECRET

    if (isAuthenticated) {
        const userData = await client.getUser(upn, password);
        console.log("+ Authenticated successfully");
        console.log("userData", userData);
        // return res.status(200).json(userData)
        return res.send(jwt.encode(payload, SECRET));
    } else {
        console.log("- Authenticated unsuccessfully");
        return res.status(401).json({"message" : "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})
    }
}