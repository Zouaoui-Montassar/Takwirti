import {  Schema, model } from "mongoose";

const ParticulierSchema = new Schema({
    user :{type : Schema.Types.ObjectId ,ref :'User'},
    ListeAmi :{type:String ,required:true}
});

const Particulier = model('Particulier' ,ParticulierSchema);

export default Particulier ;
