const express = require('express');
const { messageController } = require('../controllers/message.controller');

const router = express.Router();

router.get("/:id", messageController.getMessages);
router.post("/send/:id", messageController.sendMessage);

module.exports.messageRouter = router;