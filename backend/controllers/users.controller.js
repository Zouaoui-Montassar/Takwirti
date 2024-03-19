const { userModel } = require('../models/users.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'

const addUser = async (req, res) => {
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
        const deletedUser = await userModel.findByIdAndRemove(id);
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
