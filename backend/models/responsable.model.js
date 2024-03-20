const { Schema } = require("mongoose");

const ResponsableSchema = new Schema({
    numTel: { type: String, required: true }
});

module.exports = ResponsableSchema;

