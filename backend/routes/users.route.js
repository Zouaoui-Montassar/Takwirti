const express = require('express');
const { userController } = require('../controllers/users.controller');
const router = express.Router();
/* const passport = require('../config/passport.config.js');  zeyda for now */
/* const verifyToken = require('../middlewares/verifyToken'); zeyda for now  */
const requireAuth = require('../middlewares/requireAuth.js');

// el register kol had andou route , fel login lzouz nafsha , w c deja yethatou fard collection eli heya users ama kol wehed andou schema lih , tel9a __t edhika teb3a el "heritage" , yetsama discriminant
// yaani jet kima hachetna bedhabet 



// register + login routes ( lezem ykounou unprotected )
router.post('/users/register_responsable', userController.addResp);  
router.post('/users/register_particulier', userController.addParticulier);
router.post('/users/login', userController.login);

// lezem tet7at lenna bech tprotecti lroutes eli ba3dha lkolhom ken el login w register 
 router.use(requireAuth); 

// updates
router.put('/users/update_particulier/:id', userController.updateParticulier);
router.put('/users/update_responsable/:id', userController.updateResponsable);

/* // Get user by id 
router.get('/users/:id', userController.getUserById); */


// search user bel name / tel  ( case sensitive )

router.get('/users/search/:query', userController.getUserByQuery);

// Get all users (possible lel admin dashboard )
router.get('/users', userController.getAllUsers);

// Delete user ( admin kifkif )
router.delete('/users/delete_user/:id', userController.deleteUser);

// add friend w remove jaw
router.post('/users/add_friend', userController.addFriend);
router.delete('/users/remove_friend', userController.removeFriend);


/* router.get('/users/Particulier', verifyToken, (req, res) => {
    // If the token is valid, send a success message
    res.json({ message: "Access to particulier's home page granted" });
});
router.get('/users/Responsable', verifyToken, (req, res) => {
    // If the token is valid, send a success message
    res.json({ message: "Access to responsable's home page granted" });
}); */


/* router.get('/protected-route', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('You are authenticated!');
});
 */


module.exports.userRouter = router;

// khedma le9dima , ken testit eli zedtou jdid w lkol cv fasakh ala rouhek , el /protected bel verifyToken ab3athha
/* router.post('/users/signUp', userController.addUser);
router.post('/users/login', userController.login);
router.delete('/users/deleteUser', userController.deleteUser); */

/* 
//Protected route
router.get('/protected', verifyToken, userController.protectedEndpoint);  // lverification tsir bel jwt
*/