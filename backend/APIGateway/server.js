const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()

const mainServiceProxy = httpProxy('http://0.0.0.0:3001')

// API Gateway Option
const NAME = "API Gateway";
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    next()
})

// Set CORS
app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:8080/'
    ];
    if (!allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    return next();
})

// Proxy request
app.use('/api/', (req, res, next) => {
    mainServiceProxy(req, res, next)
})

app.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);