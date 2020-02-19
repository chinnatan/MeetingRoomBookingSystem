const fs = require('fs')
const settingPath = './src/setting.json'
const Config = require("../../config.json");

const SERVICE_NAME = Config.SERVER.NAME;

exports.getSetting = (req, res) => {
    const API_NAME = "GET SETTING"

    // ตรวจสอบว่ามีไฟล์หรือไม่
    if (fs.existsSync(settingPath)) {
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> File Setting Found`);
        // อ่านไฟล์ที่พบและแสดงผล
        fs.readFile(settingPath, function (err, data) {
            if (err) {
                console.log(`[${SERVICE_NAME}][${API_NAME}] -> ${err}`);
                throw err;
            } else {
                console.log(`[${SERVICE_NAME}][${API_NAME}] -> Read File Setting`);
                var dataParse = JSON.parse(data)
                return res.status(200).json(dataParse)
            }
        })
    } else { // ไม่พบไฟล์
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> File Setting Not Found`);
        var setting = {
            "HighestPeriodPerTime": 0, // ระยะเวลาที่สามารถจองได้สูงสุดต่อครั้ง (ชั่วโมง)
            "HighestDatePerTime": 0, // วันที่สามารถจองได้สูงสุดต่อครั้ง (วัน)
            "SlowestActivation": 0, // เวลาที่สามารถเข้าใช้งานห้องได้อย่างช้าที่สุด (นาที)
            "AdvanceBooking": 0, // เวลาในการทำการจองล่วงหน้า (นาที / ชั่วโมง / วัน)
            "AdvanceCancel": 0, // เวลาในการยกเลิกการจองล่วงหน้า (นาที / ชั่วโมง / วัน)
            "Unit": {
                "HighestPeriodPerTime": "ชั่วโมง",
                "HighestDatePerTime": "วัน",
                "SlowestActivation": "นาที",
                "AdvanceBooking": {
                    "ShortName": "H",
                    "LongName": "ชั่วโมง"
                },
                "AdvanceCancel": {
                    "ShortName": "H",
                    "LongName": "ชั่วโมง"
                }
            }
        }
        // เขียนไฟล์ขึ้นมาใหม่และแสดงผล
        fs.writeFile('./src/setting.json', JSON.stringify(setting), function (err) {
            if (err) {
                console.log(`[${SERVICE_NAME}][${API_NAME}] -> ${err}`);
                throw err;
            } else {
                console.log(`[${SERVICE_NAME}][${API_NAME}] -> Write File Setting When File Not Found`);
            }
        })
        console.log(`[${SERVICE_NAME}][${API_NAME}] -> Read File Setting`);
        return res.status(200).json(setting);
    }
}

exports.updateSetting = (req, res) => {
    const API_NAME = "UPDATE SETTING"

    var setting = {
        "HighestPeriodPerTime": req.body.HighestPeriodPerTime, // ระยะเวลาที่สามารถจองได้สูงสุดต่อครั้ง (ชั่วโมง)
        "HighestDatePerTime": req.body.HighestDatePerTime, // วันที่สามารถจองได้สูงสุดต่อครั้ง (วัน)
        "SlowestActivation": req.body.SlowestActivation, // เวลาที่สามารถเข้าใช้งานห้องได้อย่างช้าที่สุด (นาที)
        "AdvanceBooking": req.body.AdvanceBooking, // เวลาในการทำการจองล่วงหน้า (นาที / ชั่วโมง / วัน)
        "AdvanceCancel": req.body.AdvanceCancel, // เวลาในการยกเลิกการจองล่วงหน้า (นาที / ชั่วโมง / วัน)
        "Unit": {
            "HighestPeriodPerTime": req.body.Unit.HighestPeriodPerTime,
            "HighestDatePerTime": req.body.Unit.HighestDatePerTime,
            "SlowestActivation": req.body.Unit.SlowestActivation,
            "AdvanceBooking": {
                "ShortName": req.body.Unit.AdvanceBooking.ShortName,
                "LongName": req.body.Unit.AdvanceBooking.LongName
            },
            "AdvanceCancel": {
                "ShortName": req.body.Unit.AdvanceCancel.ShortName,
                "LongName": req.body.Unit.AdvanceCancel.LongName
            }
        }
    }

    // เขียนไฟล์ทับไฟล์เดิม
    fs.writeFile('./src/setting.json', JSON.stringify(setting), function (err) {
        if (err) {
            console.log(`[${SERVICE_NAME}][${API_NAME}] -> ${err}`);
            throw err;
        } else {
            console.log(`[${SERVICE_NAME}][${API_NAME}] -> Write File Setting`);
            return res.status(200).json({ "message": "บันทึกเรียบร้อย" });
        }
    })
}