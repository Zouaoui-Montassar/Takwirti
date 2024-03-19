const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema ({
    nom : {
        type : String,
    },
    prenom : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
module.exports.userModel = mongoose.model('User',userSchema);