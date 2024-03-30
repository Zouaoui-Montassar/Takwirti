const express = require('express');
const { notifController} =require('../controllers/notification.controller');
const router = express.Router();





router.get('/getallnotiuser', notifController.GetAllNotifUser);
router.post('/sendnoti', notifController.SendNotif);






module.exports.notifRouter = router;