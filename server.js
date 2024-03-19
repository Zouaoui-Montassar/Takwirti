const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());


// lroutes
app.use('/api/auth', require('./routes/auth'));  //auth route

const Database = require("./database");
const db = new Database();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} ....`);
  db.connect();
});
