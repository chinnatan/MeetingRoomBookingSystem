const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

// Server Configuration
const NAME = config.SERVER.NAME
const PORT = process.env.PORT || config.SERVER.PORT;
const HOST = config.SERVER.HOST;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.io = io;
    next();
});

// Controller Configuration
const socketController = require("./src/controller/SocketController");
app.use("/api/trigger/", socketController);

io.on('connection', function(socket) {
    console.log('user connected : ' + socket.id)

    socket.on('disconnect', function() {
        console.log('user disconnected : ' + socket.id)
    })

    socket.on('getBookingReceive', function(message) {
        console.log("getBookingReceive " + message);
        let res = JSON.parse(message).mValues
        if(res.isSuccess) {
            io.emit('getBookingSender', res.RoomId)
        }
    })

    socket.on('getBookingCurrentTimeReceive', function(message) {
        console.log(message)
        let res = JSON.parse(message).mValues
        if(res.isSuccess) {
            io.emit('getBookingCurrentTimeSender', res.RoomId)
        }
    })

    socket.on('triggerOpenDoor', function(message) {
        console.log(JSON.parse(message).mValues)
        let res = JSON.parse(message).mValues

        if(message != null) {
            io.emit('sendRoomIdToNodeMCU', String(res.RoomId))
            io.emit('sendIsOpenToNodeMCU', String(res.isOpen))
        }
    })
})

http.listen(PORT, HOST);
console.log(`[${NAME}] Running on http://${HOST}:${PORT}`);