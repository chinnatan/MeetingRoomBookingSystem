const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const http = require('http').Server(app);

const config = require('./config.json')
const jwt = require("jsonwebtoken");

const authServiceProxy = httpProxy('http://0.0.0.0:3000')
const mainServiceProxy = httpProxy('http://0.0.0.0:3001')

// API Gateway Option
const NAME = "API Gateway";
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// Middleware Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    const SECRET = config.MY_SECRET

    if(!req.headers.authorization) {
        next()
    } else if (req.headers.authorization !== "undefined") {
        if(req.headers.authorization === "login") {
            return next();
        } else {
            const token = req.headers.authorization
            jwt.verify(token, SECRET, function(err, detoken) {
                if(err) {
                    return res.status(401).json(err)
                } else {
                    return res.status(200).json(detoken) // Verify สำเร็จ แสดงข้อมูลในรูปแบบ JSON
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

// Set CORS
app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:8080/', 'http://localhost:8081/'
    ];
    if (!allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
    }
    return next();
})

// Proxy request
app.use('/api/auth/', (req, res, next) => {
    authServiceProxy(req, res, next)
})

app.use('/api/', (req, res, next) => {
    mainServiceProxy(req, res, next)
})

http.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);