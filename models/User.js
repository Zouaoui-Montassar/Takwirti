const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true , unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
// pour le moment hatit ken 3 champ , leb9eya mazelou hata netfehmou