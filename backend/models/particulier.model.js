const { Schema, Types } = require("mongoose");
const User = require('./user.model');
const ParticulierSchema = new Schema({
    ListeAmi: [{ type: Types.ObjectId, ref: 'Particulier' }]
});

const ParticulierModel = User.discriminator('Particulier', ParticulierSchema);

module.exports = { ParticulierModel };






// hedhi eli temchi cv , lfou9 bech njareb nrod el friend list array ObjectId
/* const { Schema } = require("mongoose");
const User = require('./user.model');
const ParticulierSchema = new Schema({
    ListeAmi: { type: String, required: true }
});

const ParticulierModel = User.discriminator('Particulier', ParticulierSchema);

module.exports = { ParticulierModel };
 */