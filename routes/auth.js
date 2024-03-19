const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

//register 
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
//login 
  router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, login: user.login }, 'webseckey', { expiresIn: '1h' });

        res.status(200).json({ message: 'Authentication successful', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// protected route lel login ( jwt )
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You are authorized!' });
  });


module.exports = router; 

