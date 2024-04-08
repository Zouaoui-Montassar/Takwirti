const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
// send message
const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = "660cbe2eb04582b478846ed8"  //const senderId = req.user._id;
        // const { senderId } = req.body //const senderId = req.user._id; ena yaani 
        console.log(message , receiverId , senderId)
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// SOCKET IO FUNCTIONALITY WILL GO HERE

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
// messages mtaa conversation
const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = "660cbe2eb04582b478846ed8"; //req.user._id; ena yaani 

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports.messageController = {
    sendMessage,
    getMessages
};