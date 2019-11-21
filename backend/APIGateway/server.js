const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()

const bookingServiceProxy = httpProxy('http://0.0.0.0:3001')

// API Gateway Option
const NAME = "API Gateway";
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    next()
})

// Proxy request
app.use('/api/', (req, res, next) => {
    bookingServiceProxy(req, res, next)
})

app.listen(PORT, HOST);
console.log(`${NAME} Running on http://${HOST}:${PORT}`);