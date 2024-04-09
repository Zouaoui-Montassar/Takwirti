const Admin = require('../models/Admin');
const User = require('../models/user');
const Terrain = require('../models/terrain');
const Reservation = require('../models/reservation');
const { validationResult } = require('express-validator');

module.exports = {
  deleteUsers: async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette action' });
      }

      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ message: 'L\'identifiant de l\'utilisateur est requis' });
      }

      // Supprimer l'utilisateur
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      // Enregistrement de l'action dans les journaux
      console.log(`L'utilisateur ${deletedUser.username} a été supprimé par l'administrateur ${req.user.username}`);
      
      return res.status(200).json({ message: 'Utilisateur supprimé avec succès', deletedUser });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur' });
    }
  },

  deleteTerrain: async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette action' });
      }

      const terrainId = req.params.terrainId;
      if (!terrainId) {
        return res.status(400).json({ message: 'L\'identifiant du terrain est requis' });
      }

      const terrain = await Terrain.findById(terrainId);
      if (!terrain) {
        return res.status(404).json({ message: 'Terrain non trouvé' });
      }

      // Supprimer toutes les réservations associées au terrain
      await Reservation.deleteMany({ terrain: terrainId });

      // Supprimer le terrain
      const deletedTerrain = await Terrain.findByIdAndDelete(terrainId);
      if (!deletedTerrain) {
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du terrain' });
      }
      
      // Enregistrement de l'action dans les journaux
      console.log(`Le terrain ${deletedTerrain.nom} a été supprimé par l'administrateur ${req.user.username}`);
      
      return res.status(200).json({ message: 'Terrain supprimé avec succès', deletedTerrain });
    } catch (error) {
      console.error('Erreur lors de la suppression du terrain :', error);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du terrain' });
    }
  },
};
