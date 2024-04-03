const { Schema, Types } = require("mongoose");
const User = require('./user.model');
const ParticulierSchema = new Schema({
    ListeAmi: [{ type: Types.ObjectId, ref: 'Particulier' }],
    pending: [{ type: Types.ObjectId, ref: 'Particulier' }]

});

const ParticulierModel = User.discriminator('Particulier', ParticulierSchema);

module.exports = { ParticulierModel };

