const UserModel = require("../models/userModel");

function register(req, res) {
    const { name, email, password, securityAnswer } = req.body;

    const existingUser = UserModel.findUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const user = UserModel.createUser(name, email, password, securityAnswer);

    res.status(201).json({
        message: "Registration successful",
        user: user
    });
}

function login(req, res) {
    const { email, password } = req.body;

    const user = UserModel.findUserByEmail(email);

    if (!user || user.password !== password) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.status(200).json({
        message: "Login successful",
        user: user
    });
}

function forgotPassword(req, res) {
    const { email, securityAnswer, newPassword } = req.body;

    const user = UserModel.updatePassword(email, securityAnswer, newPassword);

    if (user === null) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (user === false) {
        return res.status(401).json({
            message: "Security answer is incorrect"
        });
    }

    res.status(200).json({
        message: "Password updated successfully"
    });
}

module.exports = {
    register,
    login,
    forgotPassword
};