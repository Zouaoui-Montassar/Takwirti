const mongoose = require('mongoose');
const schema = mongoose.Schema;

const terrainSchema = new schema({
    img : { type: Object, required: true },
    nom: { type: String, required: true },
    idRes: { type: Object, required: true },
    phone: { type: Number, required: true },
    prix: { type: Number, required: true }, 
    position: { type: String, required: true }, 
    calendrier: { type: Object, required: true },
    status : { type: String, required: true },
    note : {type : Object}
});

module.exports.terrainModel = mongoose.model('Terrain', terrainSchema);
 