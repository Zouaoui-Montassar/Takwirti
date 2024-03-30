const { NotifModel } =require('../models/notification.model');


const GetAllNotifUser  = async (req, res) => {
    console.log("GET ALL NOTI HERE")
    try {
        const { id } = req.params; 

        const notifications = await NotifModel.find({ receiver: id }).populate({
            path: 'sender',
            select: 'nom prenom'
        });

        res.status(200).json({
            message: "Notifications fetched successfully",
            notifications: notifications
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch notifications",
            error: error.message
        });
    }
};
const SendNotif  = async (req, res) => {
    console.log("send noti here")
    try {
        const { sender, receiver, message } = req.body;

        const notification = await NotifModel.create({
            sender: sender,
            receiver: receiver,
            message: message
        });

        res.status(200).json({
            message: "Notification sent successfully",
            notification: notification
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to send notification",
            error: error.message
        });
    }
};


module.exports.notifController = {
    GetAllNotifUser,
    SendNotif 
};
