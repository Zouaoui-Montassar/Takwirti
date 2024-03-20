import { Schema } from "mongoose";
import User from "./User"; 

const ResponsableSchema = new Schema({
    numTel: { type: String, required: true }
});

const Responsable = User.discriminator('Responsable', ResponsableSchema);

export default Responsable;
