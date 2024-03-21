const { ResponsableModel } = require('../models/responsable.model');
const { ParticulierModel } = require('../models/particulier.model');
const UserModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


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
};




module.exports.userController = {
    addResp,
    addParticulier,
    login
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