const express = require('express');
const { terrainController } = require('../controllers/terrain.controller');
const router = express.Router();

router.post('/terrain/add', terrainController.addTerrain);
router.put('/terrain/update/:terrainId', terrainController.updateTerrain);
router.delete('/terrain/delete/:terrainId', terrainController.deleteTerrain);/*
router.get('/terrain/search', terrainController.searchTerrain);
router.get('/terrain/list', terrainController.listTerrain);
router.get('/terrain/calendar',terrainController.calendar);
router.post('/terrain/modifcalendar',terrainController.modifcalendar);*/


module.exports.terrainRouter = router;
