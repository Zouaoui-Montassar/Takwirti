const { NotifModel } =require('../models/notification.model');
require('dotenv').config();

const GetAllNotifUser  = async (req, res) => {
    console.log("GET ALL NOTI HERE")
    try {
        /* const { id } = req.body */
        
        res.status(200).json({
            message: "get all works",
            
        });
    } catch (error) {
        res.status(400).json({
            message: "get all error",
            error: error.message,
        });
    }
};
const SendNotif  = async (req, res) => {
    console.log("send noti here")
    try {
        res.status(200).json({
            message: "send notif works",
        });
    } catch (error) {
        res.status(400).json({
            message: "send notifs error",
            error: error.message,
        });
    }
};


module.exports.notifController = {
    GetAllNotifUser,
    SendNotif 
};
