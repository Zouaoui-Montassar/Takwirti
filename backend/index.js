const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/' ,(req,res) =>{
    res.send('hello world')
});

app.get('/home' ,(req,res) =>{
    res.send('home page');
    res.status(200);
});



app.listen(PORT ,() => console.log(`Server running on port ${PORT}`));