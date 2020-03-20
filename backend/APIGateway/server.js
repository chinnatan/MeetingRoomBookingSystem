const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const http = require('http').Server(app);

const config = require('./config.json')
const jwt = require("jsonwebtoken");

const authServiceProxy = httpProxy('http://0.0.0.0:3000')
const roomServiceProxy = httpProxy('http://0.0.0.0:3001')
const bookingServiceProxy = httpProxy('http://0.0.0.0:3002')
const settingServiceProxy = httpProxy('http://0.0.0.0:3003')
const toolServiceProxy = httpProxy('http://0.0.0.0:3004')

// API Gateway Option
const NAME = "API Gateway";
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// Set CORS
app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:8080/', 'http://localhost:8081/'
    ];
    if (!allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Methods", "*");
    }
    return next();
})

// Middleware Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    const SECRET = config.MY_SECRET

    if (!req.headers.authorization) {
        next()
    } else if (req.headers.authorization !== "undefined") {
        if (req.headers.authorization === "login") {
            return next();
        } else {
            const token = req.headers.authorization
            jwt.verify(token, SECRET, function (err, detoken) {
                if (err) {
                    console.log(err)
                    return res.status(200).json({"isTokenValid": true, "message": "Token หมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง"})
                } else {
                    return next()
                    // return res.status(200).json(detoken) // Verify สำเร็จ แสดงข้อมูลในรูปแบบ JSON
                }
            })
        }
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
})

// Proxy request
app.use('/api/auth/', (req, res, next) => {
    authServiceProxy(req, res, next)
})

app.use('/api/booking/', (req, res, next) => {
    bookingServiceProxy(req, res, next)
})

app.use('/api/setting/', (req, res, next) => {
    settingServiceProxy(req, res, next)
})

app.use('/api/tool/', (req, res, next) => {
    toolServiceProxy(req, res, next)
})

app.use('/api/room/', (req, res, next) => {
    roomServiceProxy(req, res, next)
})

http.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);