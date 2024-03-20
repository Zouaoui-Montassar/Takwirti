const mongoose = require('mongoose');
const schema = mongoose.Schema;

const terrainSchema = new schema({
    nom: { type: String, required: true },
    idRes: { type: String, required: true },
    phone: { type: String, required: true },
    prix: { type: Number, required: true }, 
    position: { type: String, required: true }, 
    calendrier: { type: Object, required: true },
    note : {type : Object}
});

module.exports.terrainModel = mongoose.model('Terrain', terrainSchema);
 