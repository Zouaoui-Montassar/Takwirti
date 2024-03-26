const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' }, 
    terrain: { type: Schema.Types.ObjectId, ref: 'Terrains' },
    date: { type: Date, required: true },
    status: { type: String, default: "En cours" },
    participants: { type: [String], default: [] }
});

module.exports.reservationModel = mongoose.model('Reservation', reservationSchema);
