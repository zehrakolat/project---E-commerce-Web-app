const users = [
    {
        id: 1,
        name: "Admin",
        email: "admin@test.com",
        password: "admin123",
        role: "admin"
    }
];

function createUser(name, email, password, securityAnswer) {
    const user = {
        id: users.length + 1,
        name,
        email,
        password,
        securityAnswer,
        role: "customer"
    };

    users.push(user);
    return user;
}

function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

function updatePassword(email, securityAnswer, newPassword) {
    const user = users.find(user => user.email === email);

    if (!user) {
        return null;
    }

    if (user.securityAnswer !== securityAnswer) {
        return false;
    }

    user.password = newPassword;
    return user;
}
module.exports = {
    createUser,
    findUserByEmail,
    updatePassword
};