const express = require('express');
const { terrainController } = require('../controllers/terrain.controller');
const router = express.Router();

/* protection lel les terrains lkol ( lezem ykoun authorized bech yaccessi el API , pour le moment commented bech najmou ntestiw )
const requireAuth = require('../middlewares/requireAuth.js');
router.use(requireAuth);  */


router.post('/terrain/add/:idRes', terrainController.addTerrain);
router.patch('/terrain/update/:terrainId', terrainController.updateTerrain);
router.delete('/terrain/delete/:terrainId', terrainController.deleteTerrain);
router.get(`/terrain/search`, terrainController.searchTerrain);
router.get('/terrain/list/:respId', terrainController.listTerrain);
//router.post('/terrain/modifcalendar/:respId',terrainController.updateCalendar);
router.get('/terrain/get', terrainController.getTerrain);
router.get('/terrain/getInfo/:id', terrainController.getTerrainInfo);
router.post('/terrain/:id/rate', terrainController.rateTerrain);
router.patch('/terrain/:id/rate', terrainController.updateTerrainRating);
router.get('/terrain/:id/rate/:userId', terrainController.getUserRate);
module.exports.terrainRouter = router;
