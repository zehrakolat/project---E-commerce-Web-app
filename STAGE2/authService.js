const UserModel = require("../models/userModel");

function register(name, email, password, securityAnswer) {
    const existingUser = UserModel.findUserByEmail(email);

    if (existingUser) {
        return {
            status: 400,
            message: "User already exists"
        };
    }

    const user = UserModel.createUser(name, email, password, securityAnswer);

    return {
        status: 201,
        message: "Registration successful",
        user
    };
}

function login(email, password) {
    const user = UserModel.findUserByEmail(email);

    if (!user || user.password !== password) {
        return {
            status: 401,
            message: "Invalid email or password"
        };
    }

    return {
        status: 200,
        message: "Login successful",
        user
    };
}

function forgotPassword(email, securityAnswer, newPassword) {
    const user = UserModel.findUserByEmail(email);

    if (!user) {
        return {
            status: 404,
            message: "User not found"
        };
    }

    if (user.securityAnswer !== securityAnswer) {
        return {
            status: 401,
            message: "Security answer is incorrect"
        };
    }

    UserModel.updatePassword(email, newPassword);

    return {
        status: 200,
        message: "Password updated successfully"
    };
}

module.exports = {
    register,
    login,
    forgotPassword
};