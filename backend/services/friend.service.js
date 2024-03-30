const { ParticulierModel } = require('../models/particulier.model');
const mongoose = require('mongoose');

const ajoutfriend = async (userId, friendId) => {
    try {
        const particulier = await ParticulierModel.findById(userId);
        const friend = await ParticulierModel.findById(friendId);
        console.log("particulier", particulier); 
        if (!particulier || !friend) {
            throw new Error('User or friend not found');
        }

        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            throw new Error('Invalid friend ID');
        }

        if (particulier.ListeAmi.includes(friendId)) {
            throw new Error('Friend already added');
        }

        particulier.ListeAmi.push(friendId); 
        friend.ListeAmi.push(userId); 

        await particulier.save();
        await friend.save();
        return { success: true };
    } catch (error) {
        console.error("Error in ajoutfriend:", error); 
        return { success: false, message: error.message };
    }
};




const removeFriend = async (userId, friendId) => {
    try {
        console.log(`Removing friend with userId ${userId} from user with friendId ${friendId}`);
        const user = await ParticulierModel.findById(userId);
        const friend = await ParticulierModel.findById(friendId);

        console.log(user);
        console.log(friend);

        if (!user || !friend) {
            throw new Error('User or friend not found');
        }

        if (!user.ListeAmi.includes(friendId) || !friend.ListeAmi.includes(userId)) {
            throw new Error('Not friends');
        }

        console.log(user.ListeAmi)
        console.log(friend.ListeAmi)

        user.ListeAmi.pull(friendId);
        friend.ListeAmi.pull(userId);

        await user.save();
        await friend.save();

        console.log(user.ListeAmi)
        console.log(friend.ListeAmi)

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
