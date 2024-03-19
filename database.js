const mongoose = require('mongoose');


// class lel connection maa ldatabase 
class Database {
    constructor() {
        this.Url = "mongodb://localhost:27017/testingauthproject"
    }

    connect() {
        mongoose.connect(this.Url)
            .then(() => { console.log("Database connected successffuly ") })
            .catch((error) => { console.log("Error de connexion de db " + error) })
    }
}
module.exports = Database;
