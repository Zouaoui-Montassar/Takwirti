const { Schema } = require("mongoose");

const ParticulierSchema = new Schema({
    ListeAmi: { type: String, required: true }
});

module.exports = ParticulierSchema;

