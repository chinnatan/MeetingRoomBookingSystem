const Config = require("../../config.json");

const SERVICE_NAME = Config.SERVER.NAME;

exports.triggerAddBooking = (req, res) => {
    const API_NAME = "TRIGGER ADD BOOKING"

    console.log(`[${SERVICE_NAME}][${API_NAME}] SOCKET EMIT`)
    req.io.emit('triggerAddBooking', true)
}

exports.triggerOpenDoor = (req, res) => {
    const API_NAME = "TRIGGER OPEN DOOR"

    var roomId = req.params.roomid;

    console.log(`[${SERVICE_NAME}][${API_NAME}] SOCKET EMIT`)
    req.io.emit('triggerOpenDoor', {RoomId: roomId, isOpen: true})
}