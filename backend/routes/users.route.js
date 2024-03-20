const express = require('express');
const { userController } = require('../controllers/users.controller');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.post('/users/signUp', userController.addUser);
router.post('/users/login', userController.login);
router.delete('/users/deleteUser', userController.deleteUser);

/* 
//Protected route
router.get('/protected', verifyToken, userController.protectedEndpoint);  // lverification tsir bel jwt
*/


module.exports.userRouter = router;
