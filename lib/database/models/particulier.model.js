import { Schema } from "mongoose";
import User from "./User"; 

const ParticulierSchema = new Schema({
    ListeAmi: { type: String, required: true }
});

const Particulier = User.discriminator('Particulier', ParticulierSchema);

export default Particulier;

