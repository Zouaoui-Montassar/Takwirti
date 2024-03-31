const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const NotificationSchema = new Schema({
    sender: { type: Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
});

const NotifModel = mongoose.model('Notification', NotificationSchema);

module.exports = { NotifModel };

