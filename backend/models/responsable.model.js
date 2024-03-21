const { Schema } = require("mongoose");
const User = require('./user.model');

const ResponsableSchema = new Schema({
    numTel: { type: String, required: true }
});
const ResponsableModel = User.discriminator('Responsable', ResponsableSchema);

module.exports = { ResponsableModel };



