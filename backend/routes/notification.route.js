const express = require('express');
const { notifController} =require('../controllers/notification.controller');
const router = express.Router();


router.get('/getallnotiuser/:id', notifController.GetAllNotifUser);
router.post('/sendnoti', notifController.SendNotif);

// all for now 

module.exports.notifRouter = router;