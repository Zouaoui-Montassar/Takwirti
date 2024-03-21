const { Schema } = require("mongoose");
const User = require('./user.model');
const ParticulierSchema = new Schema({
    ListeAmi: { type: String, required: true }
});

const ParticulierModel = User.discriminator('Particulier', ParticulierSchema);

module.exports = { ParticulierModel };
