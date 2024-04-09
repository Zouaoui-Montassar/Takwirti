const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true },
    DN: { type: Date, required: true },
    tel: { type: String, required: true },
    image: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/takwirtiimages.appspot.com/o/avatar_default_user.png?alt=media&token=4a791d09-23d1-44f8-806b-a2555eb9f491',
    }
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

