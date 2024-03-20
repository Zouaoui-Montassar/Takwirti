import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    login: { type: String, required: true },
    pwd: { type: String, required: true },
    DN: { type: Date, required: true },
    role: { type: String, required: true },
    tel: { type: String, required: true },
});

const User = model('User', UserSchema);

export default User;
