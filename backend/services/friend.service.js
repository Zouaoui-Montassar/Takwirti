const { ParticulierModel } = require('../models/particulier.model');
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const { NotifModel } = require('../models/notification.model');

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


const envoirequest = async (userId, friendId) => {
    try {
        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);
        
        if (!user || !friend) {
            throw new Error('User or friend not found');
        }

        if (user.pending.includes(friendId)) {
            throw new Error('Friend request already sent');
        }

        if (user.ListeAmi.includes(friendId)) {
            throw new Error('Already friends with this user');
        }
        if (friend.pending.includes(user._id)) {
            throw new Error('This user already has a pending friend request from you');
        }
        

        friend.pending.push(user);
        await friend.save();

        return { success: true };
    } catch (error) {
        console.error("Error in envoirequest:", error);
        return { success: false, message: error.message };
    }
};

const rejectRequest = async (userId, friendId) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.pending = user.pending.filter(id => id.toString() !== friendId.toString());
        await user.save();

        return { success: true };
    } catch (error) {
        console.error("Error in rejectRequest:", error);
        return { success: false, message: error.message };
    }
};

const confirmRequest = async (userId, friendId) => {
    try {
        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            throw new Error('User or friend not found');
        }

        user.pending = user.pending.filter(id => id.toString() !== friendId.toString());
        user.ListeAmi.push(friendId);
        await user.save();

        friend.ListeAmi.push(userId);
        await friend.save();
        const notification = new NotifModel({
            sender: userId,
            receiver: friendId,
            message: `${user.nom} ${user.prenom} has accepted your friend request.`,
        });
        await notification.save();

        return { success: true };
    } catch (error) {
        console.error("Error in confirmRequest:", error);
        return { success: false, message: error.message };
    }
};

const getPendingRequests = async (userId) => {
    try {
        const particulier = await ParticulierModel.findById(userId);
        if (!particulier) {
            throw new Error('User not found');
        }
        const pendingRequests = await ParticulierModel.find({ _id: { $in: particulier.pending } });
        return pendingRequests;
    } catch (error) {
        console.error("Error in getPendingRequests:", error);
        throw error;
    }
};



module.exports = {
    ajoutfriend,
    removeFriend,
    envoirequest,
    rejectRequest,
    confirmRequest,
    getPendingRequests
};
