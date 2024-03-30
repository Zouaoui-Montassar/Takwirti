const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const User = require('./user.model');

const NotificationSchema = new Schema({
    sender: { type: Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;

