const { ResponsableModel } = require('../models/responsable.model');
const { ParticulierModel } = require('../models/particulier.model');
const { NotifModel} =require('../models/notification.model')
const UserModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const friendService = require('../services/friend.service');

// create token function , parameter houwa object user ( login + sign up fel zouz nest7a9ouha)
const createToken = (user) => {
    return jwt.sign({ userId: user._id, email: user.email }, jwtSecret);
}  // najmou nzidou exprire date (nharin akeka) ka parameter fel .sign method mel jwt , pour le moment mamalthech

//lezem token fel sign up zeda madem bech yetredirecta lel home page toul 
const addResp = async (req, res) => {
    const { email, password, num_tel, ...otherData } = req.body;
    console.log(ResponsableModel);

    try {
        const existingUser = await ResponsableModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const newResp = await ResponsableModel.create({ email: email, password: hash, num_tel: num_tel, ...otherData });
        token = createToken(newResp);
        console.log(token);
        res.status(200).json({
            message: "Responsable successfully created",
            token : token ,
            userObj: newResp,
            
        });
    } catch (error) {
        res.status(400).json({
            message: "Responsable not successfully created",
            error: error.message,
        });
    }
};

const addParticulier = async (req, res) => {
    const { email, password, ListeAmi, ...otherData } = req.body;
    try {
        const existingUser = await ParticulierModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const newParticulier = await ParticulierModel.create({ email: email, password: hash, ListeAmi: ListeAmi, ...otherData });
        const token = createToken(newParticulier);
        res.status(200).json({
            message: "Particulier successfully created",
            token : token ,
            userObj: newParticulier,
        });
    } catch (error) {
        res.status(400).json({
            message: "Particulier not successfully created",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = createToken(user);
        res.status(200).json({ message: "Login successful", token: token , userObj : user , __t : user.__t });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateParticulier = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    if (updatedFields.email) {
        try {
            const existingUser = await ParticulierModel.findOne({ email: updatedFields.email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ message: "Email already taken" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to check email uniqueness", error: error.message });
        }
    }
    // password encryption ( ken yetupdata )
    if (updatedFields.password) {
        try {
            const hash = await bcrypt.hash(updatedFields.password, 10);
            updatedFields.password = hash;
        } catch (error) {
            return res.status(500).json({ message: "Failed to encrypt the new password", error: error.message });
        }
    }
    try {
        const updatedParticulier = await ParticulierModel.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ message: "Particulier updated successfully", user: updatedParticulier });
    } catch (error) {
        res.status(500).json({ message: "Failed to update Particulier", error: error.message });
    }
};

const updateResponsable = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    if (updatedFields.email) {
        try {
            const existingUser = await ResponsableModel.findOne({ email: updatedFields.email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ message: "Email already taken" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to check email uniqueness", error: error.message });
        }
    }
    if (updatedFields.password) {
        try {
            const hash = await bcrypt.hash(updatedFields.password, 10);
            updatedFields.password = hash;
        } catch (error) {
            return res.status(500).json({ message: "Failed to encrypt the new password", error: error.message });
        }
    }
    try {
        const updatedResponsable = await ResponsableModel.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({ message: "Responsable updated successfully", user: updatedResponsable });
    } catch (error) {
        res.status(500).json({ message: "Failed to update Responsable", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = createToken(user);
        res.status(200).json({ message: "User updated from db", token: token , userObj : user , __t : user.__t });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// add friend zeyda , mais khaleha for tests
const addFriend = async (req, res) => {
    const { userId, friendId } = req.body; 
    try {
        console.log(`Adding friend with userId ${userId} to user with friendId ${friendId}`);
        await friendService.ajoutfriend(userId, friendId);
        console.log(`Friend with userId ${userId} added successfully to user with friendId ${friendId}`);
        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add friend", error: error.message });
    }
};

const removeFriend = async (req, res) => {
    const { userId, friendId } = req.body; 
    try {
        await friendService.removeFriend(userId, friendId);
        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove friend", error: error.message });
    }
};

const GetAllFriends = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId).populate('ListeAmi', 'nom prenom tel');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const friends = user.ListeAmi ; 
      
      // Return nom prenom tel w _id ( lel remove )
      const friendsDetails = friends.map(friend => ({ nom: friend.nom, prenom: friend.prenom , tel:friend.tel , _id : friend._id }));
      /* console.log(friendsDetails); */
      res.status(200).json(friendsDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const sendFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        console.log(`Sending friend request from user with ID ${userId} to user with ID ${friendId}`);
        const result = await friendService.envoirequest(userId, friendId);
        if (result.success) {
            console.log(`Friend request sent successfully from user with ID ${userId} to user with ID ${friendId}`);
            const sender = await UserModel.findById(userId);
            const senderName = sender ? `${sender.nom} ${sender.prenom}` : 'Unknown user';
            const notification = new NotifModel({
                sender: userId,
                receiver: friendId,
                message: `You have received a friend request from ${senderName}`,
            });
            await notification.save();

            res.status(200).json({ message: "Friend request sent successfully" });
        } else {
            console.log(`Failed to send friend request from user with ID ${userId} to user with ID ${friendId}`);
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in sendfriendrequest:", error);
        res.status(500).json({ message: "Failed to send friend request", error: error.message });
    }
};

const rejectFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        console.log(`Rejecting friend request from user with ID ${friendId} to user with ID ${userId}`);
        const result = await friendService.rejectRequest(userId, friendId);
        if (result.success) {
            console.log(`Friend request rejected successfully from user with ID ${friendId} to user with ID ${userId}`);
            res.status(200).json({ message: "Friend request rejected successfully" });
        } else {
            console.log(`Failed to reject friend request from user with ID ${friendId} to user with ID ${userId}`);
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in rejectFriendRequest:", error);
        res.status(500).json({ message: "Failed to reject friend request", error: error.message });
    }
};
const confirmFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        console.log(`Confirming friend request from user with ID ${friendId} to user with ID ${userId}`);
        const result = await friendService.confirmRequest(userId, friendId);
        if (result.success) {
            console.log(`Friend request confirmed successfully from user with ID ${friendId} to user with ID ${userId}`);
            res.status(200).json({ message: "Friend request confirmed successfully" });
        } else {
            console.log(`Failed to confirm friend request from user with ID ${friendId} to user with ID ${userId}`);
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in confirmFriendRequest:", error);
        res.status(500).json({ message: "Failed to confirm friend request", error: error.message });
    }
};

const getPendingFriends = async (req, res) => {
    const { userId } = req.params;
    try {
        console.log(`Getting pending friend requests for user with ID ${userId}`);
        const pendingRequests = await friendService.getPendingRequests(userId);
        console.log(`Pending friend requests retrieved successfully for user with ID ${userId}`);
        res.status(200).json({ pendingRequests });
    } catch (error) {
        console.error("Error in getPendingFriends:", error);
        res.status(500).json({ message: "Failed to get pending friend requests", error: error.message });
    }
};





const getUserByQuery = async (req, res) => {
    const { query } = req.params;
    try {
        const users = await ParticulierModel.find({
            $or: [
                { nom: { $regex: query, $options: 'i' } }, // Case-insensitive match for 'nom'
                { prenom: { $regex: query, $options: 'i' } }, // Case-insensitive match for 'prenom'
                { tel: { $regex: query, $options: 'i' } }  // Case-insensitive match for 'tel'
            ]
        });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports.userController = {
    addResp,
    addParticulier,
    login,
    updateParticulier,
    updateResponsable,
    getAllUsers,
    deleteUser,
    getUserById,
    addFriend,
    removeFriend,
    getUserByQuery,
    GetAllFriends,
    sendFriendRequest,
    confirmFriendRequest,
    rejectFriendRequest,
    getPendingFriends
};
