
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // kn thama champs okhrin khassin bl admin
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
