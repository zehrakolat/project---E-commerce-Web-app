const AuthService = require("../services/authService");

function register(req, res) {
    const { name, email, password, securityAnswer } = req.body;

    const result = AuthService.register(name, email, password, securityAnswer);

    res.status(result.status).json({
        message: result.message,
        user: result.user
    });
}

function login(req, res) {
    const { email, password } = req.body;

    const result = AuthService.login(email, password);

    res.status(result.status).json({
        message: result.message,
        user: result.user
    });
}

function forgotPassword(req, res) {
    const { email, securityAnswer, newPassword } = req.body;

    const result = AuthService.forgotPassword(email, securityAnswer, newPassword);

    res.status(result.status).json({
        message: result.message
    });
}

module.exports = {
    register,
    login,
    forgotPassword
};