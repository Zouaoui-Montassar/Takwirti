const express = require('express');
const { userController } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/signUp', userController.addUser);
router.post('/users/login', userController.login);
router.delete('/users/deleteUser', userController.deleteUser);


module.exports.userRouter = router;
