const { ParticulierModel } = require('../models/particulier.model');
const mongoose = require('mongoose');


const ajoutfriend = async (userId, friendId) => {
    try {
        console.log("lenna ! !! ");
        console.log(userId);
        const particulier = await ParticulierModel.findById(userId);
        console.log("lenna 2! !! ");
        console.log("particulier", particulier); 
        if (!particulier) {
            throw new Error('Particulier not found');
        }

        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            throw new Error('Invalid friend ID');
        }

        if (particulier.ListeAmi.includes(friendId)) {
            throw new Error('Friend already added');
        }

        particulier.ListeAmi = [...particulier.ListeAmi, friendId];
        await particulier.save();
        return { success: true };
    } catch (error) {
        console.error("Error in ajoutfriend:", error); 
        return { success: false, message: error.message };
    }
};




const removeFriend = async (userId, friendId) => {
    try {
        console.log(`Removing friend with userId ${userId} from user with friendId ${friendId}`);
        const particulier = await ParticulierModel.findById(userId);
        console.log("particulier", particulier);
        if (!particulier) {
            throw new Error('Particulier not found');
        }

        if (!mongoose.Types.ObjectId.isValid(friendId) || !particulier.ListeAmi.includes(friendId)) {
            throw new Error('Invalid friend ID');
        }

        particulier.ListeAmi = particulier.ListeAmi.filter(id => id !== friendId);
        await particulier.save();
        console.log(`Friend with userId ${userId} removed successfully from user with friendId ${friendId}`);
        return { success: true };
    } catch (error) {
        console.error("Error in removeFriend:", error);
        return { success: false, message: error.message };
    }
};


module.exports = {
    ajoutfriend,
    removeFriend,
};
