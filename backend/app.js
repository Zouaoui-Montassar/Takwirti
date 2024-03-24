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

require('dotenv').config();

var app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

app.use(cors({
    origin: 'http://localhost:3000/',     // je pense nhotou cors w khw khater deja el port 4000 fel .env
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(logger('dev'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(error => console.error("Failed to connect to MongoDB:", error));

app.use("/api", userRouter)
app.use("/ter", terrainRouter)
app.use("/res", reservationRouter)

module.exports = app; 