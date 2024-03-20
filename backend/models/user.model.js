const { mongoose,Schema, model } = require ("mongoose");

const UserSchema = new Schema({
    nom: { type: String,  },
    prenom: { type: String,  },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DN: { type: Date,  },
    role: { type: String, },
    tel: { type: String, },
});

module.exports.userModel =  mongoose.model('User', UserSchema);


