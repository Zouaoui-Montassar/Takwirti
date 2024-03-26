const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true },
    DN: { type: Date, required: true },
    tel: { type: String, required: true }
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

