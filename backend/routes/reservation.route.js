const express = require('express');
const { reservationController } = require('../controllers/reservation.controller');
const router = express.Router();

/* protection lel les reservations lkol ( lezem ykoun authorized bech yaccessi el API , pour le moment commented bech najmou ntestiw )
const requireAuth = require('../middlewares/requireAuth.js');
router.use(requireAuth);  */

router.post('/reservation/add/:partId/:terId', reservationController.addReservation);
router.put('/reservation/update/:reservationId', reservationController.updateReservation);
router.put('/reservation/annul/:reservationId', reservationController.annulerReservation);
router.put('/reservation/termin/:reservationId', reservationController.terminerReservation);
router.get('/reservation/search/:partId', reservationController.searchReservation);
router.get('/reservation/listP/:partId', reservationController.listReservationP);
router.get('/reservation/listR/:resId', reservationController.listReservationR);
/* router.post('/reservation/add-participants', reservationController.addParticipantsToReservation); */
router.get('/reservation/getInfo/:terrainId/:date', reservationController.getReservation)



module.exports.reservationRouter = router;
 