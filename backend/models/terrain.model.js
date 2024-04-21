const mongoose = require('mongoose');
const schema = mongoose.Schema;

const terrainSchema = new schema({
    img : { type: String ,required: true },
    nom: { type: String, required: true },
    idRes: { type: Object, required: true },
    phone: { type: Number, required: true },
    prix: { type: Number, required: true }, 
    position: { type: String, required: true }, 
    calendrier: { 
        type: {
            open: { type: String, required: true },
            close: { type: String, required: true },
            duree: { type: Number, required: true },
            time: { type: Array, required: true },
            date: { type: String, required: true },
        }, 
        required: true 
    },
    status : { type: String, required: true },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
        rating: { type: Number },
    }],
    ratingAvg: { type: Number }
});

module.exports.terrainModel = mongoose.model('Terrain', terrainSchema);
 