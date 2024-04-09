const express = require('express');
const { userController } = require('../controllers/users.controller');
const router = express.Router();
/* const passport = require('../config/passport.config.js');  zeyda for now , khaleha lel googleoauth*/
/* const verifyToken = require('../middlewares/verifyToken'); zeyda for now  */
const requireAuth = require('../middlewares/requireAuth.js');

// el register kol had andou route , fel login lzouz nafsha , w c deja yethatou fard collection eli heya users ama kol wehed andou schema lih , tel9a __t edhika teb3a el "heritage" , yetsama discriminant
// yaani jet kima hachetna bedhabet 



// register + login routes ( lezem ykounou unprotected )
router.post('/users/register_responsable', userController.addResp);  
router.post('/users/register_particulier', userController.addParticulier);
router.post('/users/login', userController.login);

// lezem tet7at lenna bech tprotecti lroutes eli ba3dha lkolhom ken el login w register 
/*  router.use(requireAuth);  */

// updates
router.put('/users/update_particulier/:id', userController.updateParticulier);
router.put('/users/update_responsable/:id', userController.updateResponsable);

// Get user by id 
router.get('/users/:id', userController.getUserById);

//delete user
router.delete('/users/delete/:id', userController.deleteUser);

// search user bel name / tel  ( case sensitive )

router.get('/users/search/:query', userController.getUserByQuery);
// delete user 
router.get('/users/delete_user',userController.deleteUser);


// FRIENDS 
router.post('/users/add_friend', userController.addFriend); // walet zeyda for now ( khaleha for tests)
router.delete('/users/remove_friend', userController.removeFriend);
router.get('/users/:userId/friends',userController.GetAllFriends);

router.post('/users/send_friend_request', userController.sendFriendRequest);

router.post('/users/reject_friend_request', userController.rejectFriendRequest);

router.post('/users/confirm_friend_request', userController.confirmFriendRequest);

router.get('/users/:userId/pending_requests', userController.getPendingFriends);



 /* // ADMIN STUFF ( optional )
router.get('/users/all', userController.getAllUsers);
 router.delete('/users/delete_user/:id', userController.deleteUser); khalehom comment sa3at lserver ycrashi  */

module.exports.userRouter = router;

