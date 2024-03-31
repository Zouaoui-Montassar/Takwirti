const express = require('express');
const { notifController} =require('../controllers/notification.controller');
const router = express.Router();


router.get('/getallnotiuser/:id', notifController.GetAllNotifUser);
router.post('/sendnoti', notifController.SendNotif);

// zidou choufou ken fama routes wala controllers okhrin nest7a9ouhom 

module.exports.notifRouter = router;