var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users.route');
const { terrainRouter } = require('./routes/terrain.route');
const { reservationRouter } = require('./routes/reservation.route');
const cors = require('cors');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

var app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));



<<<<<<< HEAD
{/*app.use(cors({
    origin: 'http://localhost:3000/',     // je pense nhotou cors w khw khater deja el port 4000 fel .env
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));

*/}

  app.use(cors());
=======
/* app.use(cors({
    origin: 'http://localhost:3000/',     
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })); */

app.use(cors()); // yhez lkol 
>>>>>>> c06266fec003aa13130ab51d5eedd587db45c8b0
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(error => console.error("Failed to connect to MongoDB:", error));

<<<<<<< HEAD
    app.listen(3000, () => {
     console.log(`Server started on port 3000 ....`);
  });
=======
/*      app.listen(process.env.PORT, () => {
     console.log(`Server started on port ${process.env.PORT} ....`);
  });  */
>>>>>>> c06266fec003aa13130ab51d5eedd587db45c8b0

  
app.use("/api", userRouter)
app.use("/ter", terrainRouter)
app.use("/res", reservationRouter)
module.exports = app;
