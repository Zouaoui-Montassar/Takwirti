const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    try {
      const { login, name, password } = req.body;
      
      const existingUser = await User.findOne({ login });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      console.log(password);  // debug
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({ login, name, password: hashedPassword });
      await newUser.save();
      
      console.log(newUser);
      res.status(201).json({ message: 'User registered successfully' , user : newUser });  // 201 => jawna behi 
    } catch (error) {
      res.status(500).json({ message: error.message });  // 500 => internal server error 
    }
  });
  

/* router.post('/login', async (req, res) => {
  
}); */

module.exports = router; 
