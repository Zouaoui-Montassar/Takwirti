const { ResponsableModel } = require('../models/responsable.model');
const { ParticulierModel } = require('../models/particulier.model');
const UserModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const friendService = require('../services/friend.service');
const axios = require("axios");



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
        res.status(200).json({
            message: "Responsable successfully created",
            user: newResp,
        });
    } catch (error) {
        res.status(400).json({
            message: "Responsable not successfully created",
            error: error.message,
        });
    }
    try {
        const r = await axios.post(
          "https://api.chatengine.io/users/",
          { username, secret, email, first_name, last_name },
          { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
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
        res.status(200).json({
            message: "Particulier successfully created",
            user: newParticulier,
        });
    } catch (error) {
        res.status(400).json({
            message: "Particulier not successfully created",
            error: error.message,
        });
    }
    try {
        const r = await axios.post(
          "https://api.chatengine.io/users/",
          { username, secret, email, first_name, last_name },
          { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
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
        const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret);
        res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    try {
        const r = await axios.get("https://api.chatengine.io/users/me/", {
          headers: {
            "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
            "User-Name": username,
            "User-Secret": secret,
          },
        });
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
};

const updateParticulier = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
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
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

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
    removeFriend
};













/* const addUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ email: email, password: hash });
        res.status(200).json({
            message: "User successfully created",
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({
            message: "User not successfully created",
            error: error.message,
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Password not present",
        });
    }
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            });
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                  const token = jwt.sign(
                    { id: user._id, email},
                    jwtSecret,
                  );
                  res.cookie("jwt", token, {
                    httpOnly: true,
                  });
                  res.status(201).json({
                    message: "User successfully Logged in",
                    user: user._id,
                  });
                } else {
                  res.status(400).json({ message: "Login not succesful" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.status(201).json({ message: "User successfully deleted", user: deletedUser });
    } catch (error) {
        res.status(400).json({ message: "An error occurred", error: error.message });
    }
};

module.exports.userController = {
    addUser,
    login,
    deleteUser,
};
 */